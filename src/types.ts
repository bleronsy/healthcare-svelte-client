export interface Appointment {
	ID: number;
	date: string;
	reason: string;
	time: string;
	notes: string;
}

export interface Patient {
	ID: number;
	name: string;
	email: string;
	appointments: Appointment[];
}
