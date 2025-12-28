
const CLIENT_ID = '221098146252-psmtjk7chc54n35tpp4jgr3sgbipsemn.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';
const FOLDER_NAME = 'sokusel';
const DATA_FILE_NAME = 'questions.json';

export class DriveClient {
    constructor(onStatusChange) {
        this.accessToken = null;
        this.tokenClient = null;
        this.folderId = null;
        this.fileId = null;
        this.onStatusChange = onStatusChange || console.log;
    }

    async init() {
        try {
            await this.waitForGoogleLibs();

            window.gapi.load('client', async () => {
                try {
                    await window.gapi.client.init({});
                    await window.gapi.client.load('drive', 'v3');
                    this.onStatusChange("GAPI Ready");
                } catch (e) { console.error("GAPI Error", e); }
            });

            this.tokenClient = window.google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID, scope: SCOPES,
                callback: (resp) => this.handleAuthResponse(resp),
            });

            this.onStatusChange("Ready");
        } catch (err) {
            console.error("System Init Error:", err);
            this.onStatusChange("Offline Mode");
        }
    }

    waitForGoogleLibs() {
        return new Promise((resolve, reject) => {
            let count = 0;
            const check = () => {
                if (window.gapi && window.google && window.google.accounts) {
                    resolve();
                } else if (count > 50) {
                    reject(new Error("Timeout loading libs"));
                } else {
                    count++;
                    setTimeout(check, 200);
                }
            };
            check();
        });
    }

    login() {
        if (this.tokenClient) {
            this.tokenClient.requestAccessToken();
        }
    }

    handleAuthResponse(r) {
        if (r.error) {
            this.onStatusChange("Auth: " + r.error);
            return;
        }
        this.accessToken = r.access_token;
        this.onStatusChange("Auth OK");
        this.initDriveResources();
    }

    async initDriveResources() {
        try {
            // 1. Find or Create Folder
            this.onStatusChange("Locating Folder...");
            const qFolder = `name='${FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;
            const resFolder = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(qFolder)}`, {
                headers: { Authorization: `Bearer ${this.accessToken}` }
            });
            const dataFolder = await resFolder.json();

            if (dataFolder.files?.length > 0) {
                this.folderId = dataFolder.files[0].id;
            } else {
                this.onStatusChange("Creating Folder...");
                const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${this.accessToken}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: FOLDER_NAME, mimeType: 'application/vnd.google-apps.folder' })
                });
                const folder = await createRes.json();
                this.folderId = folder.id;
            }

            // 2. Find File (Initial Check for questions.json)
            await this.checkFile(DATA_FILE_NAME, window.questions || []);

            // Check for stats.json
            await this.checkFile('stats.json', { totalAnswers: 0, totalCorrect: 0, lastPlayed: '-', genreStats: {} });

        } catch (e) {
            console.error("Drive resource init error", e);
            this.onStatusChange("Drive Init Error");
        }
    }

    async checkFile(fileName, defaultContent) {
        const qFile = `name='${fileName}' and '${this.folderId}' in parents and trashed=false`;
        const resFile = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(qFile)}`, {
            headers: { Authorization: `Bearer ${this.accessToken}` }
        });
        const dataFile = await resFile.json();

        if (dataFile.files?.length === 0) {
            this.onStatusChange(`Creating ${fileName}...`);
            await this.saveData(fileName, defaultContent);
        } else {
            // We don't necessarily load everything here, app.js will request what it needs
            this.onStatusChange(`Found ${fileName}`);
        }
    }

    async loadData(fileName) {
        if (!this.folderId || !this.accessToken) return null;
        try {
            // Find file ID again to be sure (or cache it)
            const qFile = `name='${fileName}' and '${this.folderId}' in parents and trashed=false`;
            const resFile = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(qFile)}`, {
                headers: { Authorization: `Bearer ${this.accessToken}` }
            });
            const dataFile = await resFile.json();

            if (dataFile.files?.length > 0) {
                const fileId = dataFile.files[0].id;
                const contentRes = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
                    headers: { Authorization: `Bearer ${this.accessToken}` }
                });
                return await contentRes.json();
            }
            return null;
        } catch (e) {
            console.error(`Load error ${fileName}`, e);
            return null;
        }
    }

    async saveData(fileName, data) {
        if (!this.accessToken || !this.folderId) return;

        const content = JSON.stringify(data, null, 2);

        try {
            this.onStatusChange(`Saving ${fileName}...`);

            // Find file ID
            const qFile = `name='${fileName}' and '${this.folderId}' in parents and trashed=false`;
            const resFile = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(qFile)}`, {
                headers: { Authorization: `Bearer ${this.accessToken}` }
            });
            const dataFile = await resFile.json();

            if (dataFile.files?.length > 0) {
                const fileId = dataFile.files[0].id;
                await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
                    method: 'PATCH',
                    headers: { Authorization: `Bearer ${this.accessToken}`, 'Content-Type': 'application/json' },
                    body: content
                });
            } else {
                // Create
                const metadata = { name: fileName, parents: [this.folderId] };
                const boundary = '-------314159265358979323846';
                const body = `--${boundary}\nContent-Type: application/json; charset=UTF-8\n\n${JSON.stringify(metadata)}\n--${boundary}\nContent-Type: application/json\n\n${content}\n--${boundary}--`;

                await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${this.accessToken}`, 'Content-Type': `multipart/related; boundary=${boundary}` },
                    body: body
                });
            }
            this.onStatusChange("Saved");
        } catch (e) {
            console.error("Save error", e);
            this.onStatusChange("Save Failed");
        }
    }
}
