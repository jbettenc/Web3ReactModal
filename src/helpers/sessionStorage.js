import {useState, useEffect} from "react";

export const useStateWithSessionStorage = (StorageKey, initialValue) => {
	const [value, setValue] = useState(
		JSON.parse(sessionStorage.getItem(StorageKey)) || initialValue
	);

	useEffect(() => {
		sessionStorage.setItem(StorageKey, JSON.stringify(value));
	}, [value, StorageKey]);

	return [value, setValue];
};
