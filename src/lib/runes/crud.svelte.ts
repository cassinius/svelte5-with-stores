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

	let crudUser = $state<User>({ name: '', surname: '' });

	const userEq = (a: User, b: User) => a?.name === b?.name && a?.surname === b?.surname;

	const dupeUser = $derived<boolean>(users.filter((u) => userEq(u, crudUser)).length > 0);

	let selectedUser: User = $state(null!);

	$effect(() => {
		console.log('Selected user changed, updating crudUser');
		crudUser = { ...selectedUser };
	});

	let searchVal = $state('');

	const filteredUsers = $derived(
		users.filter((user) => {
			return user.surname.toLowerCase().includes(searchVal.toLowerCase());
		})
	);

	$effect(() => {
		if (filteredUsers.filter((u) => userEq(u, selectedUser)).length === 0) {
			selectedUser = null!;
		}
	});
	// $inspect({ selectedUser, crudUser, dupeUser });

	function createUser() {
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
			selectedUser = { ...crudUser };
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

	let successMsg = $state<string | null>(null);
	let errMsg = $state<string | null>(null);
	$effect(() => {
		// console.log('start timeout to clear msgs');
		if (successMsg || errMsg) {
			setTimeout(() => {
				successMsg = null;
				errMsg = null;
			}, 3000);
		}
	});

	return {
		// NOTE we expose the internal state only for testing...
		// get users() {
		// 	return users;
		// },
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
