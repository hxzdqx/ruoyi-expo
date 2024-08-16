import { Text, View, Image, StyleSheet } from "react-native";
import { Form, Input, Button, Toast } from "@ant-design/react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { getCodeImg, register } from "@/src/api/login";
import type { RegisterParamType } from "@/src/api/login";
import { useState, useEffect } from "react";
import { router } from "expo-router";

export default function RegisterScreen() {
  // 经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建
  const [form] = Form.useForm();
  // store
  // 验证码
  const [codeUrl, setCodeUrl] = useState<string>("");
  // 启用验证码
  const [captchaEnabled, setCaptchaEnabled] = useState<boolean>(true);

  // 注册表单
  const [loginForm, setLoginForm] = useState<RegisterParamType>({
    username: "",
    password: "",
    confirmPassword: "",
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
      await register(loginForm);
      Toast.success("注册成功");
      router.replace("/sign-in");
    } catch (error) {
      console.log("error", error);
      if (captchaEnabled) {
        getCode();
      }
    }
  };
  // 注册方法
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
        <Text style={styles.headerTitle}>若依移动端注册</Text>
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
            label={<Feather name="lock" size={24} color="#999" />}
            name={"confirmPassword"}
            rules={[{ required: true, message: "请再次输入密码" }]}
          >
            <Input
              onChangeText={(value) =>
                setLoginForm({ ...loginForm, confirmPassword: value })
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
          注册
        </Button>
      </View>
    </View>
  );
}

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
