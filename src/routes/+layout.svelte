<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<nav class="bg-gray-800 p-4 text-white">
	<ul class="flex flex-row space-x-6">
		<li><a href="/" class="hover:text-gray-400">Home</a></li>
		<li><a href="/patients" class="hover:text-gray-400">Patients</a></li>
	</ul>
</nav>

<main>
	{@render children()}
</main>

<footer>
	<p>&copy; 2025 Healthcare Appointment System</p>
</footer>
