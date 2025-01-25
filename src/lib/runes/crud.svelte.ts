export type User = {
	name: string;
	surname: string;
};

export function createSvelteCrud() {
	const users = $state<User[]>([
		{ name: 'John', surname: 'Doe' },
		{ name: '& Joseph', surname: 'Jesus Mary' },
		{ name: 'Bern', surname: 'McMalley' },
		{ name: 'Nova', surname: 'Blosmann' },
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

	return {
		// NOTE we expose the internal state only for testing...
		// get users() {
		// 	return users;
		// },
		get newUser() {
			return newUser;
		},
		get selectedUser() {
			return selectedUser;
		},
		set selectedUser(value: User) {
			selectedUser = value;
		},
		get searchVal() {
			return searchVal;
		},
		set searchVal(value: string) {
			searchVal = value;
		},
		get filteredUsers() {
			return filteredUsers;
		},
		get successMsg() {
			return successMsg;
		},
		get errMsg() {
			return errMsg;
		},
		createUser,
		updateUser,
		deleteUser
	};
}
