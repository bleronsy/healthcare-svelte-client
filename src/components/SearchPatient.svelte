<script lang="ts">
  import { onMount } from 'svelte';

  interface Appointment {
    ID: number;
    date: string;
    time: string;
    notes: string;
    reason: string;
  }

  interface Patient {
    id: number;
    name: string;
    email: string;
    appointments: Appointment[];
  }

  let patient: Patient | null = null;
  let patientId: string = '';

  let error: string = '';

  const fetchPatientByID = async () => {
    try {
      const response = await fetch(`http://localhost:8080/patients/${patientId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch patient');
      }

      patient = await response.json();
      console.log(patient);
    } catch (err) {
      error = err instanceof Error ? err.message : 'An unknown error occurred';
    }
  };

  onMount(() => {
    if (patientId) {
      fetchPatientByID();
    }
  });
</script>

<h1 class="text-2xl font-semibold mb-4">Search Patient by ID</h1>

<div class="mb-4">
  <label for="patientId" class="block text-sm font-medium text-gray-700">Enter Patient ID:</label>
  <input 
    type="text" 
    id="patientId" 
    bind:value={patientId} 
    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    placeholder="Enter Patient ID"
  />
</div>

<button 
  on:click={fetchPatientByID}
  class="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
>
  Search
</button>

{#if error}
  <p class="mt-4 text-red-600">{error}</p>
{/if}

{#if patient}
  <div class="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
    <h3 class="text-lg font-semibold text-gray-800">{patient?.name}</h3>
    <p class="text-gray-600">{patient.email}</p>

    {#if patient.appointments.length > 0}
      <h4 class="mt-4 text-md font-semibold text-gray-800">Appointments:</h4>
      <ul class="mt-2 space-y-2">
        {#each patient.appointments as appointment}
          <li class="p-3 border border-gray-300 rounded-md shadow-sm">
            <div class="font-semibold text-gray-700">{appointment.date} at {appointment.time}</div>
            <div class="text-gray-600">Reason: {appointment.reason}</div>
            <div class="text-gray-600">Notes: {appointment.notes}</div>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-gray-500 mt-2">No appointments found.</p>
    {/if}
  </div>
{:else}
  <p class="mt-4 text-gray-500">No patient found or no search performed yet.</p>
{/if}

<style>
  .error {
    color: red;
  }
</style>
