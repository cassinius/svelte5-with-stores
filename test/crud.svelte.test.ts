import { expect, test, beforeEach } from 'vitest';
import { createSvelteCrud, type User } from '../src/lib/runes/crud.svelte';

let crud: ReturnType<typeof createSvelteCrud>;

beforeEach(() => {
	// TODO why is the typing wrong !?
	crud = createSvelteCrud();
});

test('basic crud example properties', () => {
	expect(crud.filteredUsers).toBeDefined();
	expect(crud.filteredUsers).not.toBeNull();
	expect(crud.filteredUsers.length).toBe(5);

	expect(crud.filteredUsers).toBeDefined();
	expect(crud.filteredUsers).not.toBeNull();
	expect(crud.filteredUsers.length).toBe(5);

	expect(crud.newUser).toBeDefined();
	expect(crud.newUser).not.toBeNull();
	expect(crud.newUser.name).toBe('');
	expect(crud.newUser.surname).toBe('');

	expect(crud.selectedUser).toBeDefined();
	expect(crud.selectedUser).toBeNull();

	expect(crud.searchVal).toBeDefined();
	expect(crud.searchVal).toBe('');
});

test('create user', () => {
	crud.newUser.name = 'Holy';
	crud.newUser.surname = 'Moly';

	crud.createUser();

	// console.log(crud.filteredUsers);

	expect(crud.errMsg).toBe('');
	expect(crud.successMsg).toBe('User created.');

	// expect(crud.users.length).toBe(6);
	// expect(crud.users[5].name).toBe('Holy');
	// expect(crud.users[5].surname).toBe('Moly');

	expect(crud.newUser.name).toBe('');
	expect(crud.newUser.surname).toBe('');

	// NOTE we need to wait a few ms for the $effect to run
	setTimeout(() => {
		expect(crud.filteredUsers.length).toBe(6);
		expect(crud.filteredUsers[5].name).toBe('Holy');
		expect(crud.filteredUsers[5].surname).toBe('Moly');
	}, 10);
});
