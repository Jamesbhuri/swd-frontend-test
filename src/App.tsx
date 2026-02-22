import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import Test1Page from "./pages/Test1";
import Test2Page from "./pages/Test2";
import LanguageSwitcher from "./components/LanguageSwitcher";

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fff",
            padding: "0 24px",
          }}
        >
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["test1"]}
            style={{ flex: 1 }}
          >
            <Menu.Item key="test1">
              <Link to="/test1">Grid Layout</Link>
            </Menu.Item>
            <Menu.Item key="test2">
              <Link to="/test2">CRUD</Link>
            </Menu.Item>
          </Menu>
          <div>
            <LanguageSwitcher />
          </div>
        </Header>
        <Content style={{ padding: "24px 50px", background: "#f5f5f5" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/test1" replace />} />
            <Route path="/test1" element={<Test1Page />} />
            <Route path="/test2" element={<Test2Page />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
