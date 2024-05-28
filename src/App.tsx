import React from 'react';
import {Admin, Login, radiantLightTheme, Resource} from "react-admin";
import UserList from "./components/User/UserList";
import {dataProvider} from "./services/DataProvider";
import CategoryList from "./components/category/CategoryList";
import CategoryShow from "./components/category/CategoryShow";
import CategoryIcon from '@mui/icons-material/CategoryRounded';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import PromotionIcon from '@mui/icons-material/LocalOffer';
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';
import {CategoryCreate} from "./components/category/CategoryCreate";
import {CategoryEdit} from "./components/category/CategoryEdit";
import {ProductList} from "./components/product/ProductList";
import {ProductShow} from "./components/product/ProductShow";
import {ProductCreate} from "./components/product/ProductCreate";
import {ProductEdit} from "./components/product/ProductEdit";
import {UserCreate} from "./components/User/UserCreate";
import {UserShow} from "./components/User/UserShow";
import {UserEdit} from './components/User/UserEdit'
import {PromotionList} from "./components/promotion/PromotionList";
import {PromotionShow} from "./components/promotion/PromotionShow";
import {PromotionCreate} from "./components/promotion/PromotionCreate";
import {PromotionEdit} from "./components/promotion/PromotionEdit";
import {authProvider} from "./services/AuthProvider";
import {ImportInvoiceCreate} from "./components/importInvoice/ImportInvoiceCreate";
import ImportInvoiceList from "./components/importInvoice/ImportInvoiceList";

function App() {
    return (
        <Admin
            title="Admin"
            dataProvider={dataProvider}
            theme={radiantLightTheme}
            disableTelemetry
            authProvider={authProvider}
            loginPage={Login}
        >
            <Resource name={'user'}
                      list={UserList}
                      create={UserCreate}
                      show={UserShow}
                      icon={PersonIcon}
                      edit={UserEdit}
                      options={{label: 'Người dùng'}}
            />
            <Resource name={'product'} list={ProductList}
                      create={ProductCreate}
                      edit={ProductEdit}
                      icon={ShoppingCartRoundedIcon}
                      recordRepresentation={(product) => product.name}
                      show={ProductShow}
                      options={{label: "Sản phẩm"}}/>
            <Resource name={'category'}
                      list={CategoryList}
                      create={CategoryCreate}
                      edit={CategoryEdit}
                      icon={CategoryIcon}
                      show={CategoryShow}
                      options={{label: "Danh mục"}}
            />
            <Resource name={'promotion'}
                      list={PromotionList}
                      create={PromotionCreate}
                      edit={PromotionEdit}
                      icon={PromotionIcon}
                      show={PromotionShow}
                      options={{label: "Khuyến mãi"}}
            />
            <Resource name={'warehouse'}
                      list={ImportInvoiceList}
                      create={ImportInvoiceCreate}
                      icon={WarehouseRoundedIcon}
                      options={{label: "Nhập kho"}}

            />
        </Admin>
    );
}

export default App;
