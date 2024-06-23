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
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';
import ArticleIcon from '@mui/icons-material/Article';
import SlideshowRoundedIcon from '@mui/icons-material/SlideshowRounded';
import DiscountIcon from '@mui/icons-material/Discount';
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
import Dashboard from "./components/dashboard/Dashboard";
import ColorList from "./components/color/ColorList";
import SizeList from "./components/size/SizeList";
import {ColorCreate} from "./components/color/ColorCreate";
import {ColorEdit} from "./components/color/ColorEdit";
import {SizeCreate} from "./components/size/SizeCreate";
import {SizeEdit} from "./components/size/SizeEdit";
import LogList from "./components/Log/LogList";
import SliderList from "./components/slider/SliderList";
import {SliderCreate} from "./components/slider/SliderCreate";
import {SliderEdit} from "./components/slider/SliderEdit";
import SliderShow from "./components/slider/SliderShow";
import ReviewList from "./components/reviews/ReviewList";
import DiscountCodeList from "./components/DiscountCode/DiscountCodeList";
import {DiscountCodeCreate} from "./components/DiscountCode/DiscountCodeCreate";
import {DiscountCodeEdit} from "./components/DiscountCode/DiscountCodeEdit";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {OrderEdit} from "./components/Order/OrderEdit";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDyjVbXr-DvHTyVplN4POQk16xJQ0CfYOY",
    authDomain: "teelab-admin-v2.firebaseapp.com",
    projectId: "teelab-admin-v2",
    storageBucket: "teelab-admin-v2.appspot.com",
    messagingSenderId: "511278677449",
    appId: "1:511278677449:web:58d1b0ddbc7390ae31bc18",
    measurementId: "G-GNDCCZPNFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
    // const permissions = usePermissions()
    // console.log('Permission: ', permissions)
    return (
        <Admin
            dashboard={Dashboard}
            title="Admin"
            dataProvider={dataProvider}
            theme={radiantLightTheme}
            darkTheme={radiantDarkTheme}
            disableTelemetry
            authProvider={authProvider}
            loginPage={Login}
            // layout={Layout}
        >
            {/*{permission === 'ADMIN' ?*/}
            {/*<>*/}
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
            <Resource name={'color'}
                      list={ColorList}
                      create={ColorCreate}
                      edit={ColorEdit}
                      icon={ColorLensRoundedIcon}
                      options={{label: "Màu sắc"}}
            />

            <Resource name={'size'}
                      list={SizeList}
                      create={SizeCreate}
                      edit={SizeEdit}
                      icon={DesignServicesRoundedIcon}
                      options={{label: "Kích thước"}}
            />

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
            <Resource name={'discount-code'}
                      list={DiscountCodeList}
                      create={DiscountCodeCreate}
                      edit={DiscountCodeEdit}
                      options={{label: "Mã khuyến mãi"}}
                      icon={DiscountIcon}
            />
            <Resource name={'order'}
                      list={OrderList}
                      options={{label: "Đơn hàng"}}
                      icon={ReceiptRoundedIcon}
                      show={OrderShow}
                      edit={OrderEdit}
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
            />
            <Resource name={'log'}
                      list={LogList}
                      options={{label: "Log"}}
                      icon={ArticleIcon}
            />
            <Resource name={'slider'}
                      list={SliderList}
                      create={SliderCreate}
                      edit={SliderEdit}
                      show={SliderShow}
                      icon={SlideshowRoundedIcon}
                      options={{label: "Slider trang chủ"}}
            />
            {/*</>*/}
            {/*    :*/}
            {/*    <>No permission</>*/}
            {/*}*/}


        </Admin>
    );
}

export default App;
