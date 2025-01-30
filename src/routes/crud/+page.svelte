<script lang="ts">
	import { fly, fade, slide } from 'svelte/transition';

	import { createSvelteCrud } from '$lib/runes/crud.svelte';

	const crud = createSvelteCrud();

	const textAreaSize = $derived(Math.min(Math.max(crud.filteredUsers.length + 1, 7), 10));
</script>

<div class="page-content-wrap">
	<div class="crud-col-wrap flex flex-row gap-4 justify-center items-start">
		<div class="left-col flex flex-col">
			<h3 class="text-white text-2xl underline">CRUnesD</h3>
			<input
				type="text"
				class="w-42 mb-2"
				bind:value={crud.searchVal}
				placeholder="Filter prefix"
			/>
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
		</div>

		<div class="right-col flex flex-col gap-1 items-start text-sm">
			<div class="mt-4 text-lg text-white w-100% text-left italic">Crud User</div>

			<input type="text" class="w-42" bind:value={crud.crudUser.name} placeholder="Name" />

			<input type="text" class="w-42" bind:value={crud.crudUser.surname} placeholder="Surname" />

			<button class="w-42 btn btn-success btn-sm" onclick={crud.createUser}>Create</button>
			<button
				class="w-42 btn btn-warning btn-sm"
				disabled={!crud.selectedUser}
				onclick={crud.updateUser}>Update</button
			>
			<button
				class="w-42 btn btn-error btn-sm"
				disabled={!crud.selectedUser}
				onclick={crud.deleteUser}>Delete</button
			>
		</div>
	</div>

	{#if crud.successMsg || crud.errMsg}
		<div class="crud-msgs-wrap mt-2 h-10" transition:slide>
			{#if crud.successMsg}
				<div class="text-green-400" in:fly={{ y: -100, duration: 300 }} out:fade>
					{crud.successMsg}
				</div>
			{/if}

			{#if crud.errMsg}
				<div class="text-red-400" in:fly={{ y: -100, duration: 300 }} out:fade>
					{crud.errMsg}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.user.active {
		background-color: #132e9b;
		color: white;
	}
</style>
