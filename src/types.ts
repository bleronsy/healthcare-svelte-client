export interface Appointment {
	id: number;
	date: string;
	reason: string;
	time: string;
	notes: string;
}

export interface Patient {
	id: number;
	name: string;
	email: string;
	appointments: Appointment[];
}
