import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecordingInfo } from 'openvidu-angular';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class RestService {
	private baseHref: string;

	constructor(private http: HttpClient) {
		if (environment.openvidu_url && environment.openvidu_url.length > 0) {
			this.baseHref = environment.openvidu_url;
		} else {
			this.baseHref = '/' + (!!window.location.pathname.split('/')[1] ? window.location.pathname.split('/')[1] + '/' : '');
		}
	}

	async login(username: string, password: string): Promise<{ logged: boolean }> {
		return this.postRequest('auth/login', { username, password });
	}

	async getConfig() {
		return await this.getRequest('call/config');
	}

	async getTokens(
		sessionId: string,
		nickname?: string
	): Promise<{ cameraToken: string; screenToken: string; recordingEnabled: boolean; recordings?: RecordingInfo[] }> {
		return this.postRequest('sessions', { sessionId, nickname });
	}
	adminLogin(password: string): Promise<any[]> {
		return this.postRequest('auth/admin/login', { password });
	}
	adminLogout(): Promise<void> {
		return this.postRequest('auth/admin/logout', {});
	}

	getRecordings() {
		return this.getRequest(`recordings/`);
	}

	startRecording(sessionId: string) {
		return this.postRequest('recordings/start', { sessionId });
	}

	stopRecording(sessionId: string) {
		return this.postRequest('recordings/stop', { sessionId });
	}

	deleteRecording(recordingId: string): Promise<RecordingInfo[]> {
		return this.deleteRequest(`recordings/delete/${recordingId}`);
	}

	private postRequest(path: string, body: any): Promise<any> {
		try {
			return lastValueFrom(this.http.post<any>(this.baseHref + path, body));
		} catch (error) {
			if (error.status === 404) {
				throw { status: error.status, message: 'Cannot connect with backend. ' + error.url + ' not found' };
			}
			throw error;
		}
	}

	private getRequest(path: string, responseType?: string): any {
		try {
			const options = {};
			if (responseType) {
				options['responseType'] = responseType;
			}
			return lastValueFrom(this.http.get(`${this.baseHref}${path}`, options));
		} catch (error) {
			if (error.status === 404) {
				throw { status: error.status, message: 'Cannot connect with backend. ' + error.url + ' not found' };
			}
			throw error;
		}
	}

	private deleteRequest(path: string) {
		try {
			return lastValueFrom(this.http.delete<any>(`${this.baseHref}${path}`));
		} catch (error) {
			console.log(error);
			if (error.status === 404) {
				throw { status: error.status, message: 'Cannot connect with backend. ' + error.url + ' not found' };
			}
			throw error;
		}
	}
}
