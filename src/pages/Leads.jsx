import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useTenant } from "../context/TenantContext";
import { getLeads } from "../services/leadService";

import { Table, Tag } from "antd";

export default function Leads() {
   const { tenantId } = useTenant();
   const [leads, setLeads] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (!tenantId) return;

      setLoading(true);

      getLeads(tenantId)
         .then(res => setLeads(res.data))
         .catch(err => console.error(err))
         .finally(() => setLoading(false));

   }, [tenantId]);

   // 🔥 Table Columns
   const columns = [
      {
         title: "Name",
         dataIndex: "name",
         key: "name",
      },
      {
         title: "Phone",
         dataIndex: "phone",
         key: "phone",
      },
      {
         title: "Business",
         dataIndex: "business",
         key: "business",
      },
      {
         title: "Requirement",
         dataIndex: "requirement",
         key: "requirement",
         render: (text) => <Tag color="blue">{text}</Tag>,
      },
      {
         title: "Date",
         dataIndex: "createdAt",
         key: "createdAt",
         render: (date) =>
            new Date(date).toLocaleDateString(),
      },
   ];

   return (
      <Layout>
         <div style={{ padding: "20px" }}>
            <h2>📋 Leads</h2>

            <Table
               columns={columns}
               dataSource={leads}
               rowKey="_id"
               loading={loading}
               bordered
               pagination={{ pageSize: 5 }}
            />
         </div>
      </Layout>
   );
}