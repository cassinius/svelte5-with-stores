<script lang="ts">
	type User = {
		name: string;
		surname: string;
	};

	export const users = $state<User[]>([
		{ name: 'John', surname: 'Doe' },
		{ name: '& Joseph', surname: 'Jesus Mary' },
		{ name: 'Bern', surname: 'McMalley' },
		{ name: 'Nova', surname: 'Blosman' },
		{ name: 'Bal', surname: 'Bal' }
	]);

	const newUser = $state<User>({ name: '', surname: '' });

	const userEq = (a: User, b: User) => a?.name === b?.name && a?.surname === b?.surname;

	const dupeUser = $derived<boolean>(users.filter((u) => userEq(u, newUser)).length > 0);

	let selectedUser: User = $state(null!);

	$effect(() => {
		newUser.name = selectedUser?.name ?? '';
		newUser.surname = selectedUser?.surname ?? '';
	});

	let searchVal = $state('');

	const filteredUsers = $derived(
		users.filter((user) => {
			return user.surname.toLowerCase().includes(searchVal.toLowerCase());
		})
	);

	const selUserInFilter = $derived<boolean>(
		filteredUsers.filter((u) => userEq(u, selectedUser)).length > 0
	);
	$effect(() => {
		if (!selUserInFilter) {
			selectedUser = null!;
		}
	});
	// $inspect({ selectedUser, newUser, dupeUser, selUserInFilter });

	function createUser() {
		if (dupeUser) {
			errMsg = 'User already exists';
			return;
		}
		if (newUser.name === '' || newUser.surname === '') {
			errMsg = 'Name and surname must be filled';
			return;
		}
		if (newUser.name.length < 3 || newUser.surname.length < 3) {
			errMsg = 'Name and surname must be at least 3 characters long';
			return;
		}
		users.push({ ...newUser });
		newUser.name = '';
		newUser.surname = '';
		successMsg = 'User created.';
		errMsg = '';
	}

	function updateUser() {
		if (selectedUser) {
			if (newUser.name === '' || newUser.surname === '') {
				errMsg = 'Name and surname must be filled';
				return;
			}
			if (newUser.name.length < 3 || newUser.surname.length < 3) {
				errMsg = 'Name and surname must be at least 3 characters long';
				return;
			}
			selectedUser.name = newUser.name;
			selectedUser.surname = newUser.surname;
			successMsg = 'User updated.';
			errMsg = '';
		}
	}

	function deleteUser() {
		if (selectedUser) {
			users.splice(users.indexOf(selectedUser), 1);
			selectedUser = null!;
			successMsg = 'User deleted.';
			errMsg = '';
		}
	}

	let successMsg = $state<string>(null!);
	let errMsg = $state<string>(null!);
</script>

<h3>CRUnesD</h3>

<input type="text" class="w-42 mb-2" bind:value={searchVal} placeholder="Filter prefix" />

<div class="flex flex-row gap-2 items-start">
	<div class="userlist w-42 p-1 text-sm bg-slate-100 text-slate-700 rounded">
		{#each filteredUsers as user (`${user.name} ${user.surname}`)}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="user flex flex-row gap-2 pl-2 text-right hover:cursor-pointer hover:text-white hover:bg-blue-600"
				class:active={selectedUser === user}
				onclick={() => (selectedUser = user)}
			>
				<div>{user.surname}, {user.name}</div>
			</div>
		{/each}
	</div>

	<div class="flex flex-col gap-1 items-end text-sm">
		<div class="flex flex-row gap-2 items-center">
			<!-- Name: -->
			<input type="text" class="w-42" bind:value={newUser.name} placeholder="Name" />
		</div>

		<div class="flex flex-row gap-2 items-center">
			<!-- Surname: -->
			<input type="text" class="w-42" bind:value={newUser.surname} placeholder="Surname" />
		</div>
	</div>
</div>

<div class="mt-2">
	<button class="w-28 btn btn-success btn-sm" onclick={createUser}>Create</button>
	<button class="w-28 btn btn-warning btn-sm" disabled={!selectedUser} onclick={updateUser}
		>Update</button
	>
	<button class="w-28 btn btn-error btn-sm" disabled={!selectedUser} onclick={deleteUser}
		>Delete</button
	>
</div>

{#if successMsg}
	<div class="mt-2 text-green-400">
		{successMsg}
	</div>
{/if}

{#if errMsg}
	<div class="mt-2 text-red-400">
		{errMsg}
	</div>
{/if}

<style>
	.user.active {
		background-color: #132e9b;
		color: white;
	}
</style>
