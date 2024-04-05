import { RichTextInput } from "ra-input-rich-text";
import React, { useEffect, useState } from "react";
import {
	Button,
	Create,
	Datagrid,
	DateInput,
	DeleteButton,
	Edit,
	EditButton,
	ImageField,
	ImageInput,
	List,
	NumberInput,
	ReferenceField,
	ReferenceInput,
	SearchInput,
	SelectInput,
	SimpleForm,
	TextField,
	TextInput,
	useDataProvider,
	useGetList,
	useListContext,
} from "react-admin";

export const ListProduct = (props) => {
	const { filterValues, setFilters } = useListContext();
	const dataProvider = useDataProvider();
	const [searchTerm, setSearchTerm] = useState(
		filterValues && filterValues.q ? filterValues.q : ""
	);

	const handleSearch = () => {
		setFilters({
			...filterValues,
			q: searchTerm,
		});
		dataProvider.getList("posts", { filter: { q: searchTerm } });
	};

	return (
		<List {...props}>
			<Datagrid style={{ overflowX: "auto" }}>
				<TextField source="id" />
				<TextField source="name" />
				<TextField source="description" />
				<TextField source="price" />
				<TextField source="discount" />
				<TextField source="img" label="Image Name" />
				<TextField source="status" />
				<ReferenceField
					label="Category Id"
					source="categoryId"
					reference="category"
					linkType={false}>
					<TextField source="name" />
				</ReferenceField>
				<EditButton />
				<DeleteButton />
			</Datagrid>
		</List>
	);
};

export const EditProduct = (props) => (
	<Edit {...props} style={{ overflowX: "auto" }}>
		<SimpleForm>
			<TextInput source="name" />
			<RichTextInput source="description" />
			<NumberInput source="price" />
			<NumberInput source="discount" />
			<ImageField title="img" />
			<NumberInput source="status" />
			<ReferenceInput
				label="Category"
				source="categoryId"
				reference="category">
				<SelectInput optionText="name" />
			</ReferenceInput>
		</SimpleForm>
	</Edit>
);

export const CreateProduct = (props) => {
	const [imageName, setImageName] = useState("");

	const handleImageChange = (event) => {
		const selectedImage = event.target.files[0];
		if (selectedImage) {
			// Tách phần tên tệp từ đường dẫn đầy đủ
			const fileName = selectedImage.name;
			setImageName(fileName);
		}
	};
	return (
		<Create {...props}>
			<SimpleForm>
				<TextInput source="name" />
				<RichTextInput source="description" multiline fullWidth />
				<NumberInput source="price" />
				<NumberInput source="discount" />
				<TextInput
					type="file"
					accept="image/*"
					source="img"
					onChange={handleImageChange}
				/>
				<TextInput
					source="img"
					value={imageName}
					label="Image Name"
					disabled
				/>
				<NumberInput source="status" />
				<ReferenceInput
					label="Category"
					source="categoryId"
					reference="category">
					<SelectInput optionText="name" />
				</ReferenceInput>
			</SimpleForm>
		</Create>
	);
};
