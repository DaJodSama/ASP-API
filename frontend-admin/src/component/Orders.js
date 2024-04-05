import React from "react";
import {
	List,
	Datagrid,
	TextField,
	Edit,
	SimpleForm,
	EditButton,
	TextInput,
	Create,
	NumberInput,
	DateInput,
	SelectInput,
	ReferenceInput,
	ReferenceField,
} from "react-admin";
export const ListOrders = (props) => (
	<List {...props} perPage={10} style={{ overflowX: "auto" }}>
		<Datagrid>
			<TextField source="id" />
			<TextField source="orderDate" />
			<TextField source="orderTotal" />
			<TextField source="orderStatus" />
			<ReferenceField label="User" source="odPrdUserId" reference="user">
				<TextField source="email" />
			</ReferenceField>
			<EditButton />
		</Datagrid>
	</List>
);
export const EditOrders = (props) => (
	<Edit {...props} style={{ overflowX: "auto" }}>
		<SimpleForm>
			<DateInput source="orderDate" />
			<TextInput source="orderTotal" />
			<TextInput source="orderStatus" />
			<ReferenceInput label="User" source="odPrdUserId" reference="user">
				<SelectInput optionText="email" />
			</ReferenceInput>
		</SimpleForm>
	</Edit>
);
export const CreateOrders = (props) => (
	<Create {...props} style={{ overflowX: "auto" }}>
		<SimpleForm>
			<TextInput source="orderDate" />
			<TextInput source="orderTotal" />
			<TextInput source="orderStatus" />
			<ReferenceInput label="User" source="odPrdUserId" reference="user">
				<SelectInput optionText="email" />
			</ReferenceInput>
		</SimpleForm>
	</Create>
);
