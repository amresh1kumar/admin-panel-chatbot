import {
  useEffect,
  useState
} from "react";

import {
  Table,
  Tag,
  Input,
  message
} from "antd";

import {
  getAllTenants
} from "../../services/adminService";

export default function
  AdminTenants() {

  const [tenants, setTenants] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  // 🔹 LOAD TENANTS
  const loadTenants =
    async () => {

      try {

        setLoading(true);

        const res =
          await getAllTenants(
            search
          );

        setTenants(
          res.data
        );

      } catch (err) {

        message.error(
          "Failed to load tenants"
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    const timer =
      setTimeout(() => {
        loadTenants();
      }, 500);

    return () =>
      clearTimeout(timer);

  }, [search]);

  // 🔹 TABLE COLUMNS
  const columns = [

    {
      title: "Tenant",

      render: (_, record) => (

        <div>

          <div
            style={{
              fontWeight: 600
            }}
          >
            {record.name}
          </div>

          <div
            style={{
              color: "#888",
              fontSize: 12
            }}
          >
            {record._id}
          </div>

        </div>
      )
    },

    {
      title:
        "Phone Number ID",

      dataIndex:
        "phoneNumberId",

      render: (value) =>
        value || "-"
    },

    {
      title:
        "Business Account ID",

      dataIndex:
        "whatsappBusinessAccountId",

      render: (value) =>
        value || "-"
    },

    {
      title: "Connection",

      render: (_, record) => (

        <Tag
          color={
            record.phoneNumberId
              ? "green"
              : "red"
          }
        >
          {
            record.phoneNumberId
              ? "CONNECTED"
              : "NOT CONNECTED"
          }
        </Tag>
      )
    },

    {
      title: "Verify Token",

      render: (_, record) => (

        <span>
          {
            record.verifyToken
              ? "Configured"
              : "Missing"
          }
        </span>
      )
    },

    {
      title: "Created",

      render: (_, record) => (

        new Date(
          record.createdAt
        ).toLocaleDateString(
          "en-GB"
        )
      )
    }
  ];

  return (
    <div
      style={{
        padding: 20
      }}
    >

      <h2>
        Tenants
      </h2>

      {/* 🔹 SEARCH */}
      <div
        style={{
          marginBottom: 20
        }}
      >

        <Input
          placeholder="Search tenant..."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          style={{
            width: 300
          }}
        />

      </div>

      {/* 🔹 TABLE */}
      <Table
        dataSource={tenants}
        loading={loading}
        rowKey="_id"
        columns={columns}

        pagination={{
          pageSize: 10
        }}

        scroll={{
          x: 1200
        }}
      />

    </div>
  );
}