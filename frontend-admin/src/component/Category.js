import React from "react";
import {
	Create,
	Datagrid,
	Edit,
	EditButton,
	List,
	SelectInput,
	SimpleForm,
	TextField,
	TextInput,
} from "react-admin";

export const ListCategory = (props) => {
	return (
		<List {...props} perPage={10}>
			<Datagrid>
				<TextField source="id" />
				<TextField source="name" />
				<EditButton />
			</Datagrid>
		</List>
	);
};

export const EditCategory = (props) => {
	return (
		<Edit {...props}>
			<SimpleForm>
				<TextInput source="name" />
			</SimpleForm>
		</Edit>
	);
};

export const CreateCategory = (props) => {
	return (
		<Create {...props}>
			<SimpleForm>
			<TextInput source="name" />
			</SimpleForm>
		</Create>
	);
};
