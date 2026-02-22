import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Button,
  Space,
  Row,
  Col,
  Typography,
  Popconfirm,
} from "antd";
import dayjs from "dayjs";
import type { RootState, AppDispatch } from "@/store";
import {
  loadPersons,
  addPerson,
  updatePerson,
  deletePerson,
  deleteMultiple,
  setEditingPerson,
  Person,
} from "@/store/personSlice";
import tableStyles from "./table.module.css";

const { Title } = Typography;
const { Option } = Select;

const PHONE_CODES = [
  { code: "+66", label: "🇹🇭 +66" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+81", label: "🇯🇵 +81" },
  { code: "+86", label: "🇨🇳 +86" },
  { code: "+82", label: "🇰🇷 +82" },
  { code: "+33", label: "🇫🇷 +33" },
];

export default function Test2Page() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { persons, editingPerson } = useSelector(
    (state: RootState) => state.person,
  );
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const currentTableData = persons.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  useEffect(() => {
    dispatch(loadPersons());
  }, [dispatch]);

  useEffect(() => {
    if (editingPerson) {
      form.setFieldsValue({
        ...editingPerson,
        birthday: editingPerson.birthday
          ? dayjs(editingPerson.birthday)
          : undefined,
        salary: editingPerson.salary ? Number(editingPerson.salary) : undefined,
      });
    }
  }, [editingPerson, form]);

  const handleSubmit = (values: Record<string, unknown>) => {
    const personData = {
      title: values.title as string,
      firstName: values.firstName as string,
      lastName: values.lastName as string,
      birthday: values.birthday
        ? (values.birthday as dayjs.Dayjs).format("YYYY-MM-DD")
        : "",
      nationality: values.nationality as string,
      citizenId: values.citizenId as string,
      gender: values.gender as string,
      phoneCode: values.phoneCode as string,
      phone: values.phone as string,
      passportNo: (values.passportNo as string) || "",
      salary: values.salary ? String(values.salary) : "",
    };

    if (editingPerson) {
      dispatch(updatePerson({ ...personData, id: editingPerson.id }));
    } else {
      dispatch(addPerson(personData));
    }
    form.resetFields();
    dispatch(setEditingPerson(null));
  };

  const handleEdit = (person: Person) => {
    dispatch(setEditingPerson(person));
  };

  const handleCancelEdit = () => {
    dispatch(setEditingPerson(null));
    form.resetFields();
  };

  const handleDelete = (id: string) => {
    dispatch(deletePerson(id));
  };

  const handleDeleteSelected = () => {
    dispatch(deleteMultiple(selectedRowKeys as string[]));
    setSelectedRowKeys([]);
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
        {t("test2.title")}
      </Title>

      <div
        style={{
          background: "#fafafa",
          padding: 24,
          borderRadius: 12,
          marginBottom: 24,
          border: "1px solid #e8e8e8",
        }}
      >
        <Form
          form={form}
          layout="inline"
          onFinish={handleSubmit}
          style={{ gap: 12, flexWrap: "wrap" }}
          initialValues={{ phoneCode: "+66" }}
        >
          <Row gutter={[12, 12]} style={{ width: "100%" }}>
            <Col xs={24} sm={6} md={4}>
              <Form.Item
                name="title"
                rules={[{ required: true, message: "" }]}
                style={{ width: "100%" }}
              >
                <Select placeholder={t("test2.form.selectTitle")}>
                  <Option value="mr">{t("test2.form.mr")}</Option>
                  <Option value="mrs">{t("test2.form.mrs")}</Option>
                  <Option value="ms">{t("test2.form.ms")}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={9} md={10}>
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: "" }]}
                style={{ width: "100%" }}
              >
                <Input placeholder={t("test2.form.firstName")} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={9} md={10}>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: "" }]}
                style={{ width: "100%" }}
              >
                <Input placeholder={t("test2.form.lastName")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[12, 12]} style={{ width: "100%" }}>
            <Col xs={24} sm={8}>
              <Form.Item name="birthday" style={{ width: "100%" }}>
                <DatePicker
                  placeholder={t("test2.form.birthday")}
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                name="nationality"
                rules={[{ required: true, message: "" }]}
                style={{ width: "100%" }}
              >
                <Select placeholder={t("test2.form.selectNationality")}>
                  <Option value="thai">{t("test2.form.thai")}</Option>
                  <Option value="french">{t("test2.form.french")}</Option>
                  <Option value="american">{t("test2.form.american")}</Option>
                  <Option value="chinese">{t("test2.form.chinese")}</Option>
                  <Option value="japanese">{t("test2.form.japanese")}</Option>
                  <Option value="korean">{t("test2.form.korean")}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="citizenId" style={{ width: "100%" }}>
                <Input placeholder={t("test2.form.citizenId")} maxLength={13} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[12, 12]} style={{ width: "100%" }}>
            <Col xs={24} sm={8}>
              <Form.Item
                name="gender"
                rules={[{ required: true, message: "" }]}
                style={{ width: "100%" }}
              >
                <Select placeholder={t("test2.form.selectGender")}>
                  <Option value="male">{t("test2.form.male")}</Option>
                  <Option value="female">{t("test2.form.female")}</Option>
                  <Option value="unspecified">
                    {t("test2.form.unspcified")}
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Space.Compact style={{ width: "100%" }}>
                <Form.Item name="phoneCode" noStyle>
                  <Select style={{ width: 100 }}>
                    {PHONE_CODES.map((pc) => (
                      <Option key={pc.code} value={pc.code}>
                        {pc.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="phone" noStyle>
                  <Input
                    placeholder={t("test2.form.phone")}
                    style={{ flex: 1 }}
                  />
                </Form.Item>
              </Space.Compact>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="passportNo" style={{ width: "100%" }}>
                <Input placeholder={t("test2.form.passportNo")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[12, 12]} style={{ width: "100%" }}>
            <Col xs={24} sm={8}>
              <Form.Item name="salary" style={{ width: "100%" }}>
                <InputNumber
                  placeholder={t("test2.form.salary")}
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    value!.replace(/,/g, "") as unknown as number
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={16}>
              <Space>
                {editingPerson ? (
                  <>
                    <Button type="primary" htmlType="submit">
                      {t("test2.form.update")}
                    </Button>
                    <Button onClick={handleCancelEdit}>
                      {t("test2.form.cancel")}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="primary" htmlType="submit">
                      {t("test2.form.submit")}
                    </Button>
                    <Button onClick={() => form.resetFields()}>
                      {t("test2.form.reset")}
                    </Button>
                  </>
                )}
              </Space>
            </Col>
          </Row>
        </Form>
      </div>

      {selectedRowKeys.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <Popconfirm
            title={`${t("test2.table.deleteSelected")}?`}
            onConfirm={handleDeleteSelected}
          >
            <Button danger>
              {t("test2.table.deleteSelected")} ({selectedRowKeys.length})
            </Button>
          </Popconfirm>
        </div>
      )}

      <div className={tableStyles.customTableWrapper}>
        <table className={tableStyles.customTable}>
          <thead>
            <tr>
              <th className={tableStyles.checkboxCell}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRowKeys(
                        currentTableData.map((p: Person) => p.id),
                      );
                    } else {
                      setSelectedRowKeys([]);
                    }
                  }}
                  checked={
                    currentTableData.length > 0 &&
                    selectedRowKeys.length === currentTableData.length
                  }
                />
              </th>
              <th>{t("test2.table.name")}</th>
              <th>{t("test2.table.gender")}</th>
              <th>{t("test2.table.phone")}</th>
              <th>{t("test2.table.nationality")}</th>
              <th>{t("test2.table.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{ textAlign: "center", padding: "32px" }}
                >
                  {t("test2.table.noData")}
                </td>
              </tr>
            ) : (
              currentTableData.map((person: Person) => (
                <tr key={person.id}>
                  <td className={tableStyles.checkboxCell}>
                    <input
                      type="checkbox"
                      checked={selectedRowKeys.includes(person.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRowKeys((prev) => [...prev, person.id]);
                        } else {
                          setSelectedRowKeys((prev) =>
                            prev.filter((key) => key !== person.id),
                          );
                        }
                      }}
                    />
                  </td>
                  <td>
                    <div
                      className={tableStyles.textTeal}
                      style={{ fontWeight: 500 }}
                    >
                      {person.title} {person.firstName} {person.lastName}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`${tableStyles.badge} ${
                        person.gender === "male"
                          ? tableStyles.badgeBlue
                          : person.gender === "female"
                            ? tableStyles.badgePurple
                            : tableStyles.badgeGray
                      }`}
                    >
                      {person.gender === "male"
                        ? t("test2.form.male")
                        : person.gender === "female"
                          ? t("test2.form.female")
                          : t("test2.form.unspcified")}
                    </span>
                  </td>
                  <td>
                    {person.phone
                      ? `${person.phoneCode || ""} ${person.phone}`
                      : "-"}
                  </td>
                  <td>
                    {t(
                      `test2.form.${person.nationality}` as Parameters<
                        typeof t
                      >[0],
                    )}
                  </td>
                  <td>
                    <Space>
                      <Button type="link" onClick={() => handleEdit(person)}>
                        {t("test2.table.edit")}
                      </Button>
                      <Popconfirm
                        title={t("test2.table.delete") + "?"}
                        onConfirm={() => handleDelete(person.id)}
                      >
                        <Button type="link" danger>
                          {t("test2.table.delete")}
                        </Button>
                      </Popconfirm>
                    </Space>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Custom Pagination */}
        {persons.length > 0 && (
          <div className={tableStyles.pagination}>
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p: number) => p - 1)}
            >
              Prev
            </Button>
            <span style={{ padding: "4px 8px", alignSelf: "center" }}>
              Page {currentPage} of {Math.ceil(persons.length / pageSize)}
            </span>
            <Button
              disabled={currentPage >= Math.ceil(persons.length / pageSize)}
              onClick={() => setCurrentPage((p: number) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
