<script lang="ts">
	import { createSvelteCrud } from '$lib/runes/crud.svelte';

	const crud = createSvelteCrud();
</script>

<h3>CRUnesD</h3>

<input type="text" class="w-42 mb-2" bind:value={crud.searchVal} placeholder="Filter prefix" />

<div class="flex flex-row gap-2 items-start">
	<div class="userlist w-42 p-1 text-sm bg-slate-100 text-slate-700 rounded">
		{#each crud.filteredUsers as user (`${user.name} ${user.surname}`)}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="user flex flex-row gap-2 pl-2 text-right hover:cursor-pointer hover:text-white hover:bg-blue-600"
				class:active={crud.selectedUser === user}
				onclick={() => (crud.selectedUser = user)}
			>
				<div>{user.surname}, {user.name}</div>
			</div>
		{/each}
	</div>

	<div class="flex flex-col gap-1 items-end text-sm">
		<div class="flex flex-row gap-2 items-center">
			<!-- Name: -->
			<input type="text" class="w-42" bind:value={crud.newUser.name} placeholder="Name" />
		</div>

		<div class="flex flex-row gap-2 items-center">
			<!-- Surname: -->
			<input type="text" class="w-42" bind:value={crud.newUser.surname} placeholder="Surname" />
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
	<button class="w-28 btn btn-error btn-sm" disabled={!crud.selectedUser} onclick={crud.deleteUser}
		>Delete</button
	>
</div>

{#if crud.successMsg}
	<div class="mt-2 text-green-400">
		{crud.successMsg}
	</div>
{/if}

{#if crud.errMsg}
	<div class="mt-2 text-red-400">
		{crud.errMsg}
	</div>
{/if}

<style>
	.user.active {
		background-color: #132e9b;
		color: white;
	}
</style>
