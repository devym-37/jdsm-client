import React from "react";

import { Card as AntdCard } from "antd";

const Card = ({ title, body }) => {
  return (
    <AntdCard
      style={styles.card}
      headStyle={styles.cardHeader}
      bodyStyle={styles.cardBody}
      title={title}
    >
      {body}
    </AntdCard>
  );
};

const styles = {
  cardHeader: {
    backgroundColor: "rgba(31, 45, 65, 0.03)",
    minHeight: "3.5rem",
    fontWeight: "bold",
  },
  cardBody: {
    minHeight: 80,
    fontWeight: "bold",
    fontSize: "1.5rem",
    textAlign: "right",
  },
  card: {
    borderRadius: 15,
    boxShadow: "0 5px 10px rgba(154, 160, 185, 0.05), 0 15px 100px rgba(166, 173, 201, 0.2)",
  }
}

export default Card;
