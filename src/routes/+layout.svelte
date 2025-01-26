<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<nav class="absolute w-screen h-12 bg-slate-600 flex flex-row justify-center items-center">
	<ul class="flex flex-row gap-4 justify-center items-center">
		<!-- <li>
			<a href="/" class="hover:underline">Home</a>
		</li> -->
		<li>
			<a href="/count" class="hover:underline">Count</a>
		</li>
		<li>
			<a href="/temps" class="hover:underline">Temps</a>
		</li>
		<li>
			<a href="/flights" class="hover:underline">Flights</a>
		</li>
		<li>
			<a href="/timer" class="hover:underline">Timer</a>
		</li>
		<li>
			<a href="/crud" class="hover:underline">CRUD</a>
		</li>
	</ul>
</nav>
<main class="w-screen h-screen flex flex-col items-center justify-center">
	{@render children()}
</main>
