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
	ReferenceInput,
	SelectInput,
} from "react-admin";
export const ListGallery = (props) => (
	<List {...props} style={{ overflowX: "auto" }}>
		<Datagrid>
			<TextField source="id" />
			<TextField source="thumbnail" />
			<EditButton />
		</Datagrid>
	</List>
);
export const EditGallery = (props) => (
	<Edit {...props} style={{ overflowX: "auto" }}>
		<SimpleForm>
			<TextInput source="thumbnail" />
			<ReferenceInput
				label="Product"
				source="product.id"
				reference="product">
				<SelectInput optionText="id" />
			</ReferenceInput>
		</SimpleForm>
	</Edit>
);
export const CreateGallery = (props) => (
	<Create {...props} style={{ overflowX: "auto" }}>
		<SimpleForm>
			<TextInput source="thumbnail" />
			<ReferenceInput
				label="Product"
				source="product.id"
				reference="product">
				<SelectInput optionText="id" />
			</ReferenceInput>
		</SimpleForm>
	</Create>
);
