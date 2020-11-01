import React, { Component } from 'react';
import { Text, PageHeader } from 'antd';

class InnerHeader extends Component {
    render() {
        return (
            <PageHeader style={styles.container}>
                <span style={styles.title}>Hello World</span>
                <span style={styles.subTitle}>Sub Title</span>
            </PageHeader>
        );
  }
}

const styles = {
    container: {
        height: "12rem",
        backgroundColor: '#0061f2',
        backgroundImage: 'linear-gradient(135deg, #0061f2 0%, rgba(105, 0, 199, 0.8) 100%)',
        color: 'white',
        lineHeight: '1.5'
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '2.25rem',
        fontWeight: '500',
        marginBottom: 0
    },
    subTitle: {

    }
};

export default InnerHeader;
