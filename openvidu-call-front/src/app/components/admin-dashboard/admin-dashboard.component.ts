import { Component, OnInit } from '@angular/core';
import { RecordingService } from 'openvidu-angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
	recordings = [];
	logged: boolean;
	error: any;
	constructor(private restService: RestService, private recordingService: RecordingService) {}

	ngOnInit(): void {}

	ngOnDestroy() {
		this.onLogoutClicked();
	}

	async onLoginClicked(pass: string) {
		try {
			const resp: any = await this.restService.login(pass);
			this.logged = true;
			this.recordings = resp.recordings;
		} catch (error) {
			this.error = error;
			console.log(error);
		}
	}
	async onLogoutClicked() {
		this.logged = false;
		await this.restService.logout();
	}

	async onRefreshRecordingsClicked() {
		try {
			this.recordings = await this.restService.getRecordings();
		} catch (error) {
			this.onLogoutClicked();
		}
	}

	async onDeleteRecordingClicked(recordingId: string) {
		try {
			this.recordings = await this.restService.deleteRecording(recordingId);
		} catch (error) {
			console.error(error);
		}
	}
}
