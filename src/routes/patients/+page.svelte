<script lang="ts">
	import { onMount } from 'svelte';
	import PatientList from '../../components/PatientList.svelte'; // Assuming the correct path
	import SearchPatient from '../../components/SearchPatient.svelte';
	import type { Patient } from '../../types';

	let patients: Patient[] = [];
	let error: string = '';
	let selectedPatient: Patient | null = null;

	const fetchPatients = async () => {
		try {
			const response = await fetch('http://localhost:8080/patients');
			if (!response.ok) throw new Error('Failed to fetch patients');
			patients = await response.json();
		} catch (err) {
			error = err instanceof Error ? err.message : 'An unknown error occurred';
		}
	};

	onMount(fetchPatients);

	const selectPatient = (patient: Patient | null) => {
		selectedPatient = patient;
	};
</script>

<h1 class="mb-4 text-2xl font-bold">Patients List</h1>

<SearchPatient />
{#if error}
	<p class="text-red-500">{error}</p>
{/if}

{#if patients.length > 0}
	<PatientList {patients} {selectedPatient} onSelectPatient={selectPatient} />
{:else}
	<p>Loading patients...</p>
{/if}
