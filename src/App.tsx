import React from 'react';
import {Admin, Login, radiantLightTheme, radiantDarkTheme, Resource} from "react-admin";
import UserList from "./components/User/UserList";
import {dataProvider} from "./services/DataProvider";
import CategoryList from "./components/category/CategoryList";
import CategoryShow from "./components/category/CategoryShow";
import CategoryIcon from '@mui/icons-material/CategoryRounded';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import PromotionIcon from '@mui/icons-material/LocalOffer';
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';
import BlogIcon from '@mui/icons-material/Book';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import ArticleIcon from '@mui/icons-material/Article';
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
import {authProvider} from "./services/AuthProvider";
import {ImportInvoiceCreate} from "./components/importInvoice/ImportInvoiceCreate";
import ImportInvoiceList from "./components/importInvoice/ImportInvoiceList";
import PromotionCreate from "./components/promotion/PromotionCreate";
import PromotionEdit from "./components/promotion/PromotionEdit";
import BlogList from "./components/blogs/BlogList";
import BlogShow from "./components/blogs/BlogShow";
import {BlogCreate} from "./components/blogs/BlogCreate";
import {BlogEdit} from "./components/blogs/BlogEdit";
import OrderList from "./components/Order/OrderList";
import {OrderShow} from "./components/Order/OrderShow";
import {ReviewList} from "./components/reviews/ReviewList";
import LogList from "./components/Log/LogList";


function App() {
    return (
        <Admin
            title="Admin"
            dataProvider={dataProvider}
            theme={radiantLightTheme}
            darkTheme={radiantDarkTheme}
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
            <Resource name={'order'}
                      list={OrderList}
                      options={{label: "Đơn hàng"}}
                      icon={ReceiptRoundedIcon}
                      show={OrderShow}
            />
            <Resource name={'warehouse'}
                      list={ImportInvoiceList}
                      create={ImportInvoiceCreate}
                      icon={WarehouseRoundedIcon}
                      options={{label: "Nhập kho"}}

            />
            <Resource name={'blog'} list={BlogList}
                      show={BlogShow}
                      create={BlogCreate}
                      edit={BlogEdit}
                      icon={BlogIcon}
                      options={{label: "Blog"}}>
            </Resource>
            <Resource name={'review'}
                      list={ReviewList}
                      icon={RateReviewRoundedIcon}
                      options={{label: "Đánh giá"}}
            ></Resource>
            <Resource name={'log'}
                      list={LogList}
                      options={{label: "Log"}}
                      icon={ArticleIcon}
            />
        </Admin>
    );
}

export default App;
