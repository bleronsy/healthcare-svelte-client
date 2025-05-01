<script lang="ts">
	import type { Patient } from '../types';
	export let selectedPatient: Patient;

	let appointmentDate = '';
	let appointmentTime = '';
	let appointmentNotes = '';
	let error = '';

	const createAppointment = async () => {
		const newAppointment = {
			date: appointmentDate,
			time: appointmentTime,
			notes: appointmentNotes
		};

		try {
			const response = await fetch(
				`http://localhost:8080/patients/${selectedPatient?.id}/appointments`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(newAppointment)
				}
			);

			if (!response.ok) {
				throw new Error('Failed to create appointment');
			}

			location.reload();
		} catch (err) {
			error = err instanceof Error ? err.message : 'An unknown error occurred';
		}
	};
</script>

<div class="mt-4">
	<h3 class="text-md font-semibold mb-2">Create Appointment for {selectedPatient?.name}</h3>
	<form on:submit|preventDefault={createAppointment} class="space-y-3">
		<div>
			<label for="date" class="block mb-1">Date</label>
			<input id="date" type="date" bind:value={appointmentDate} required class="w-full p-2 border rounded" />
		</div>

		<div>
			<label for="time" class="block mb-1">Time</label>
			<input id="time" type="time" bind:value={appointmentTime} required class="w-full p-2 border rounded" />
		</div>

		<div>
			<label for="appointment-notes" class="block mb-1">Notes</label>
			<textarea id="appointment-notes" bind:value={appointmentNotes} class="w-full p-2 border rounded"></textarea>
		</div>

		<button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
			Create Appointment
		</button>

		{#if error}
			<p class="text-red-500 mt-2">{error}</p>
		{/if}
	</form>
</div>
