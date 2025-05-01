<script lang="ts">
	import CreateAppointmentForm from './CreateAppointmentForm.svelte';
	import type { Patient } from '../types';

	export let patients: Patient[];
	export let selectedPatient: Patient | null;
	export let onSelectPatient: (patient: Patient | null) => void;
</script>

<ul class="space-y-6">
	{#each patients as patient}
		<li
			class="mt-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg"
		>
			<div class="mb-4 flex items-center justify-between">
				<div>
					<strong class="text-lg font-semibold text-gray-900">{patient?.name}</strong><br />
					<span class="text-sm text-gray-600">{patient?.email}</span>
				</div>

				<div class="text-sm text-gray-500">
					<span class="font-semibold">{patient.appointments?.length}</span>
					{patient.appointments?.length === 1 ? 'Appointment' : 'Appointments'}
				</div>
			</div>

			{#if patient?.appointments?.length > 0}
				<h3 class="text-md mt-3 font-semibold text-gray-800">Appointments:</h3>
				<ul class="ml-4 mt-2 space-y-2">
					{#each patient.appointments as appointment}
						<li class="rounded-md border border-gray-200 bg-gray-50 p-3 shadow-sm">
							<div class="font-semibold text-gray-700">
								{appointment.date} at {appointment.time}
							</div>
							<div class="text-gray-600">Reason: {appointment?.reason}</div>
							<div class="text-gray-600">Notes: {appointment?.notes}</div>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="mt-2 text-gray-500">No appointments found.</p>
			{/if}

			<button
				class="mt-6 w-full rounded-md bg-indigo-500 py-3 text-white transition-all duration-300 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				on:click={() => {
					if (selectedPatient?.id === patient?.id) {
						onSelectPatient(null);
					} else {
						onSelectPatient(patient); 
					}
				}}
			>
				{selectedPatient?.id === patient?.id ? 'Close Appointment Form' : 'Create Appointment'}
			</button>

			{#if selectedPatient?.id === patient?.id}
				<div class="mt-4 rounded-lg border border-gray-300 bg-gray-50 p-4 shadow-sm">
					<CreateAppointmentForm {selectedPatient} />
				</div>
			{/if}
		</li>
	{/each}
</ul>
