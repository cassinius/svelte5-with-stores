<script lang="ts">
	import { fly, fade } from 'svelte/transition';

	import { createSvelteCrud } from '$lib/runes/crud.svelte';

	const crud = createSvelteCrud();

	const textAreaSize = $derived(Math.min(Math.max(crud.filteredUsers.length + 1, 5), 7));
</script>

<div class="w-screen h-screen flex flex-col items-center justify-center">
	<div class="crud-wrap p-6 bg-slate-600 rounded-xl">
		<h3 class="text-red-400">CRUnesD</h3>

		<input type="text" class="w-42 mb-2" bind:value={crud.searchVal} placeholder="Filter prefix" />

		<div class="flex flex-row gap-2 items-start">
			<select
				class="userlist w-42 p-1 text-sm bg-slate-100 text-slate-700 rounded"
				bind:value={crud.selectedUser}
				size={textAreaSize}
			>
				{#each crud.filteredUsers as user (`${user.name} ${user.surname}`)}
					<option
						class="user flex flex-row gap-2 pl-2 text-right hover:cursor-pointer hover:text-white hover:bg-blue-600"
						class:active={crud.selectedUser === user}
						onclick={() => (crud.selectedUser = user)}
					>
						{user.surname}, {user.name}
					</option>
				{/each}
			</select>

			<div class="flex flex-col gap-1 items-start text-sm">
				<div class="text-lg text-white w-100% text-left">Crud User</div>
				<div class="flex flex-row gap-2 items-center">
					<!-- Name: -->
					<input type="text" class="w-42" bind:value={crud.crudUser.name} placeholder="Name" />
				</div>

				<div class="flex flex-row gap-2 items-center">
					<!-- Surname: -->
					<input
						type="text"
						class="w-42"
						bind:value={crud.crudUser.surname}
						placeholder="Surname"
					/>
				</div>
			</div>
		</div>

		<div class="mt-2">
			<button class="w-28 btn btn-success btn-sm" onclick={crud.createUser}>Create</button>
			<button
				class="w-28 btn btn-warning btn-sm"
				disabled={!crud.selectedUser}
				onclick={crud.updateUser}>Update</button
			>
			<button
				class="w-28 btn btn-error btn-sm"
				disabled={!crud.selectedUser}
				onclick={crud.deleteUser}>Delete</button
			>
		</div>

		{#if crud.successMsg}
			<div class="mt-2 text-green-400" in:fly={{ y: -100, duration: 300 }} out:fade>
				{crud.successMsg}
			</div>
		{/if}

		{#if crud.errMsg}
			<div class="mt-2 text-red-400" in:fly={{ y: -100, duration: 300 }} out:fade>
				{crud.errMsg}
			</div>
		{/if}
	</div>
</div>

<style>
	.user.active {
		background-color: #132e9b;
		color: white;
	}
</style>
