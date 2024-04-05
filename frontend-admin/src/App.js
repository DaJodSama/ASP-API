import React from "react";
import { Admin, Resource, fetchUtils } from "react-admin";
import AdminPanel from "./component/AdminPanel";
import simpleRestProvider from "ra-data-simple-rest";
import {
	CreateCategory,
	EditCategory,
	ListCategory,
} from "./component/Category";

import { CreateProduct, EditProduct, ListProduct } from "./component/Product";
import { CreateRole, EditRole, ListRole } from "./component/Role";
import { CreateGallery, EditGallery, ListGallery } from "./component/Gallery";
import { CreateUser, EditUser, ListUser } from "./component/User";
import { CreateOrders, EditOrders, ListOrders } from "./component/Orders";
import dataProvider from "./dataProvider";

const httpClient = fetchUtils.fetchJson;

const App = () => {
	return (
		<Admin dashboard={AdminPanel} dataProvider={dataProvider}>
			{/* USER */}
			<Resource
				name="user"
				list={ListUser}
				edit={EditUser}
				create={CreateUser}
			/>
			{/* CATEGORY */}
			<Resource
				name="Category"
				list={ListCategory}
				edit={EditCategory}
				create={CreateCategory}
			/>
			{/* PRODUCT */}
			<Resource
				name="product"
				list={ListProduct}
				edit={EditProduct}
				create={CreateProduct}
			/>
			{/* ORDERS */}
			<Resource
				name="OrderProduct"
				list={ListOrders}
				edit={EditOrders}
				create={CreateOrders}
			/>
		</Admin>
	);
};
export default App;
