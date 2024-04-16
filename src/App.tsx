import {Admin, Resource, useGetList} from "react-admin";
import UserList from "./components/UserList";
import {dataProvider} from "./services/DataProvider";
import authProvider from "./services/AuthProvider";
import CategoryList from "./components/category/CategoryList";
import CategoryShow from "./components/category/CategoryShow";
import CategoryIcon from '@mui/icons-material/CategoryRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import PromotionIcon from '@mui/icons-material/LocalOffer';
import {CategoryCreate} from "./components/category/CategoryCreate";
import {CategoryEdit} from "./components/category/CategoryEdit";
import {ProductList} from "./components/product/ProductList";
import {ProductShow} from "./components/product/ProductShow";
import {ProductCreate} from "./components/product/ProductCreate";
import {ProductEdit} from "./components/product/ProductEdit";
import {PromotionList} from "./components/promotion/PromotionList";
function App() {
    return (
        <Admin
            title="Admin"
            dataProvider={dataProvider}
            disableTelemetry
            // authProvider={authProvider}
        >
            {/*<Resource name={'user'} list={UserList}/>*/}
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
                      icon={PromotionIcon}
                      options={{label: "Khuyến mãi"}}
            />
        </Admin>
    );
}

export default App;
