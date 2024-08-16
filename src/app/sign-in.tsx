import { Text, View, Image, StyleSheet } from "react-native";
import { Form, Input, Button } from "@ant-design/react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useSession } from "../ctx";
import { getCodeImg } from "@/src/api/login";
import type { LoginParamType } from "@/src/api/login";
import { useState, useEffect } from "react";
import { useUserStore } from "../store";
import { router, Link } from "expo-router";

export default function SignIn() {
  // 经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建
  const [form] = Form.useForm();
  // store
  const { login, getInfo } = useUserStore();
  // 验证码
  const [codeUrl, setCodeUrl] = useState<string>("");
  // 启用验证码
  const [captchaEnabled, setCaptchaEnabled] = useState<boolean>(true);
  // 用户注册开关
  const [register, setRegister] = useState<boolean>(false);
  const { signIn } = useSession();
  // 登录表单
  const [loginForm, setLoginForm] = useState<LoginParamType>({
    username: "admin",
    password: "admin123",
    code: "",
    uuid: "",
  });
  // 获取图形验证码
  const getCode = async () => {
    try {
      const _res = await getCodeImg();
      setCaptchaEnabled(_res.captchaEnabled ?? true);
      if (captchaEnabled) {
        setCodeUrl("data:image/gif;base64," + _res.img);
        setLoginForm({ ...loginForm, uuid: _res.uuid, code: "" });
      }
    } catch (error) {}
  };
  // 密码登录
  const pwdLogin = async () => {
    try {
      const res = await login(loginForm);
      await signIn(res.token);
      await getInfo();
      console.log("获取用户信息成功");
      router.replace("/");
    } catch (error) {
      console.log("error", error);
      if (captchaEnabled) {
        getCode();
      }
    }
  };
  // 登录方法
  const handleLogin = async () => {
    form.submit();
  };
  useEffect(() => {
    getCode();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/src/assets/images/logo.png")}></Image>
        <Text style={styles.headerTitle}>若依移动端登录</Text>
      </View>
      <View style={styles.content}>
        <Form
          name="login"
          form={form}
          onFinish={pwdLogin}
          initialValues={loginForm}
        >
          <Form.Item
            label={<AntDesign name="user" size={24} color="#999" />}
            name={"username"}
            rules={[{ required: true, message: "账号不能为空" }]}
          >
            <Input
              onChangeText={(value) =>
                setLoginForm({ ...loginForm, username: value })
              }
              type="text"
              placeholder="请输入账号"
              allowClear
            ></Input>
          </Form.Item>
          <Form.Item
            label={<Feather name="lock" size={24} color="#999" />}
            name={"password"}
            rules={[{ required: true, message: "密码不能为空" }]}
          >
            <Input
              onChangeText={(value) =>
                setLoginForm({ ...loginForm, password: value })
              }
              type="password"
              placeholder="请输入密码"
              allowClear
            ></Input>
          </Form.Item>
          <Form.Item
            label={<Feather name="code" size={24} color="#999" />}
            name={"code"}
            rules={[{ required: true, message: "验证码不能为空" }]}
          >
            <View style={styles.contentCode}>
              <View style={{ flex: 1 }}>
                <Input
                  onChangeText={(value) =>
                    setLoginForm({ ...loginForm, code: value })
                  }
                  type="text"
                  placeholder="请输入验证码"
                ></Input>
              </View>
              <Button onPress={getCode} style={styles.contentCodeBtn}>
                <Image
                  style={styles.contentImg}
                  source={{ uri: codeUrl }}
                ></Image>
              </Button>
            </View>
          </Form.Item>
        </Form>
        <Button style={{ marginTop: 40 }} type="primary" onPress={handleLogin}>
          登录
        </Button>
        {register && <Register />}
        <XieYi />
      </View>
    </View>
  );
}

const Register = () => {
  return (
    <View style={{ marginTop: 15, flexDirection: "row" }}>
      <Text>没有账号？</Text>
      <Link href="/register">立即注册</Link>
    </View>
  );
};

const XieYi = () => {
  return (
    <View
      style={{ marginTop: 15, flexDirection: "row", justifyContent: "center" }}
    >
      <Text style={{ color: "#333" }}>登录即代表同意</Text>
      <Link
        style={{ marginLeft: 10, color: "#1890ff" }}
        push
        href={{
          pathname: "/common/webview",
          params: {
            title: "用户服务协议",
            url: "https://ruoyi.vip/protocol.html",
          },
        }}
      >
        《用户协议》
      </Link>
      <Link
        style={{ marginLeft: 10, color: "#1890ff" }}
        push
        href={{
          pathname: "/common/webview",
          params: {
            title: "隐私政策",
            url: "https://ruoyi.vip/protocol.html",
          },
        }}
      >
        《隐私政策》
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "15%",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  content: {
    marginHorizontal: 20,
    marginTop: "15%",
  },
  contentCode: {
    flexDirection: "row",
  },
  contentImg: {
    width: 100,
    height: 38,
    marginLeft: 10,
  },
  contentCodeBtn: {
    marginLeft: 10,
    width: 100,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: "transparent",
  },
});
