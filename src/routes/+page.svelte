<script lang="ts">
  let name = '';
  let email = '';
  
  const handleSubmit = async () => {
    const newPatient = { name, email };

    const res = await fetch('http://localhost:8080/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPatient),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Patient created:', data);
      name = ''; 
      email = '';
    } else {
      console.error('Error creating patient:', res.statusText);
    }
  };
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-semibold text-center mb-6">Create Patient</h1>

    <form on:submit|preventDefault={handleSubmit}>
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">First Name and Last Name:</label>
        <input 
          type="text" 
          id="name" 
          bind:value={name} 
          required 
          class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div class="mb-6">
        <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
        <input 
          type="email" 
          id="email" 
          bind:value={email} 
          required 
          class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button 
        type="submit" 
        class="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Create Patient
      </button>
    </form>
  </div>
</div>
