export type User = {
	name: string;
	surname: string;
};

export function createSvelteCrud() {
	// NOTE 'users' is internal state we do not expose to the world
	const users = $state<User[]>([
		{ name: 'John', surname: 'Doe' },
		{ name: '& Joseph', surname: 'Jesus Mary' },
		{ name: 'Bern', surname: 'McMalley' },
		{ name: 'Nova', surname: 'Blosmann' },
		{ name: 'Bal', surname: 'Bal' }
	]);

	let crudUser = $state<User>({ name: '', surname: '' });

	let selectedUser: User = $state(null!);

	let searchVal = $state('');

	let successMsg = $state<string | null>(null);

	let errMsg = $state<string | null>(null);

	const filteredUsers = $derived(
		users.filter((user) => {
			return user.surname.toLowerCase().includes(searchVal.toLowerCase());
		})
	);

	const userEq = (a: User, b: User) => a?.name === b?.name && a?.surname === b?.surname;

	const dupeUser = $derived<boolean>(users.filter((u) => userEq(u, crudUser)).length > 0);

	$effect(() => {
		if (selectedUser) {
			// console.log('Selected user changed, updating crudUser');
			crudUser = { ...selectedUser };
		}
	});

	$effect(() => {
		// console.log('filtered users changed, checking selectedUser');
		if (filteredUsers.filter((u) => userEq(u, selectedUser)).length === 0) {
			selectedUser = null!;
			crudUser = { name: '', surname: '' };
		}
	});
	// $inspect({ selectedUser, crudUser, dupeUser });

	$effect(() => {
		// console.log('start timeout to clear msgs');
		if (successMsg || errMsg) {
			setTimeout(() => {
				successMsg = null;
				errMsg = null;
			}, 3000);
		}
	});

	function createUser() {
		console.log({ crudUser });
		if (dupeUser) {
			errMsg = 'User already exists';
			return;
		}
		if (crudUser.name === '' || crudUser.surname === '') {
			errMsg = 'Name and surname must be filled';
			return;
		}
		if (crudUser.name.length < 3 || crudUser.surname.length < 3) {
			errMsg = 'Name and surname must be at least 3 characters long';
			return;
		}

		users.push({ ...crudUser });
		crudUser = { name: '', surname: '' };
		successMsg = 'User created.';
		errMsg = null;
	}

	function updateUser() {
		if (selectedUser) {
			if (crudUser.name === '' || crudUser.surname === '') {
				errMsg = 'Name and surname must be filled';
				return;
			}
			if (crudUser.name.length < 3 || crudUser.surname.length < 3) {
				errMsg = 'Name and surname must be at least 3 characters long';
				return;
			}
			users.splice(users.indexOf(selectedUser), 1, { ...crudUser });
			// console.log({ filteredUsers });
			successMsg = 'User updated.';
			errMsg = null;
		}
	}

	function deleteUser() {
		if (selectedUser) {
			users.splice(users.indexOf(selectedUser), 1);
			selectedUser = null!;
			successMsg = 'User deleted.';
			errMsg = null;
		}
	}

	return {
		get crudUser() {
			return crudUser;
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
