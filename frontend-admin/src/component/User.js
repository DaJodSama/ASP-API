import React from "react";
import {
	List,
	Datagrid,
	TextField,
	Edit,
	SimpleForm,
	EditButton,
	Create,
	SelectInput,
	ReferenceInput,
	DateInput,
	DeleteButton,
} from "react-admin";
export const ListUser = (props) => (
	<List {...props} perPage={10} style={{ overflowX: "auto" }}>
		<Datagrid>
			<TextField source="id" />
			<TextField source="firstName" />
			<TextField source="lastName" />
			<TextField source="email" />
			<TextField source="password" />
			<EditButton />
			<DeleteButton />
		</Datagrid>
	</List>
);
export const EditUser = (props) => (
	<Edit {...props} style={{ overflowX: "auto" }}>
		<SimpleForm>
			<TextField source="firstName" />
			<TextField source="lastName" />
			<TextField source="email" />
			<TextField source="password" />
		</SimpleForm>
	</Edit>
);
export const CreateUser = (props) => (
	<Create {...props} style={{ overflowX: "auto" }}>
		<SimpleForm>
			<DateInput source="firstName" />
			<TextField source="lastName" />
			<TextField source="email" />
			<TextField source="password" />
		</SimpleForm>
	</Create>
);
