import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Card, Button, Row, Col, Input, Table, Progress } from 'antd';
import styles from './Example.css'
import Mock from 'mockjs'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


function compareFunction(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

const scroll = {
  x: true, y: 400
}

function FileList() {
  const rowSelection = {};

  const columns = [{
    title: '文件名',
    dataIndex: 'name',
    width: 150,
    sorter: compareFunction    
  }, {
    title: '大小',
    dataIndex: 'size',
    width: 150,
    sorter: compareFunction    
  }, {
    title: '修改日期',
    dataIndex: 'modifytime',
    sorter: compareFunction
  }];  

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `资料 ${i}`,
      size: `${Mock.mock('@float(40, 500, 0, 2)')} MB`,
      modifytime: `2016-${Mock.mock('@datetime("MM-dd HH:mm:ss")')}`,
    });
  }

  return (
    <Table className={styles.table}
      columns={columns} 
      dataSource={data} 
      pagination={{ pageSize: 30 }} 
      scroll={{ x: true, y: 400 }} 
      rowSelection={rowSelection}
      bordered={true}
    />
  )
}


function TransformList() {
  const rowSelection = {};

  const columns = [{
    title: '文件名',
    dataIndex: 'name',
    width: 150,
    sorter: compareFunction    
  }, {
    title: '大小',
    dataIndex: 'size',
    width: 150,
  }, {
    title: '状态',
    dataIndex: 'state',
    render: (text, record, index) => {
      return (
        <span>
          <Progress percent={text.current} />{text.isPause ? '已暂停': null}
        </span>
      )
    }
  }];

  const data = [];
  for (let i = 0; i < 3; i++) {
    let maxSize = Mock.mock('@float(100, 500, 0, 2)')

    data.push({
      key: i,
      name: `资料 ${i}`,
      size: `${maxSize * 0.1} / ${maxSize}`,
      state: { isPause: true, current: 10 },
    });

    if (i === 0) {
      data[i].state.isPause = !data[i].state.isPause;
    }
  }

  return (
    <Table className={styles.table}
      columns={columns} 
      dataSource={data} 
      // pagination={{ pageSize: 1 }} 
      scroll={scroll} 
      rowSelection={rowSelection}
      bordered={true}
    />
  )
}

function FileTool() {
  return (
    <Row gutter={8}>
      <Col span={2} offset={1}>
        <Button type="primary" shape="circle" icon="download" />
      </Col>
      <Col span={2}>
        <Button type="primary" shape="circle" icon="upload" />
      </Col>
      <Col span={2}>
        <Button type="primary" shape="circle" icon="edit" />
      </Col>
      <Col span={2}>
        <Button type="primary" shape="circle" icon="share-alt" />
      </Col>
      <Col span={2}>
        <Button type="danger" shape="circle" icon="delete" />
      </Col>
      <Col span={2}>
        <Button type="primary" shape="circle" icon="info" />
      </Col>
      <Col span={5} push={5}>
        <Input placeholder="搜索..." />
      </Col>
    </Row>
  )
}

function TransformTool() {
  return (
    <Row gutter={8}>
      <Col span={2} offset={1}>
        <Button type="primary" shape="circle" icon="pause" />
      </Col>
      <Col span={2}>
        <Button type="primary" shape="circle" icon="caret-right" />
      </Col>
      <Col span={2}>
        <Button type="danger" shape="circle" icon="delete" />
      </Col>      
      <Col span={6} push={10}>
        <Progress percent={30} />
      </Col>
    </Row>
  )
}

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    mode: 'inline',
    current: 'transform-up'
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">
            善班在线共享系统
          </div>

          {/* 菜单 */}          
          <Menu theme="dark" 
            mode={this.state.mode} 
            defaultSelectedKeys={[this.state.current]} 
            onClick={this.handleClick}
          >
            <Menu.Item key="user">
              <span>
                <Icon type="user" />
                <span className="nav-text">用户</span>
              </span>
            </Menu.Item>
            
            <Menu.Item key="file">
              <span>
                <Icon type="file" />
                <span className="nav-text">文件</span>
              </span>
            </Menu.Item>

            <SubMenu
              key="transform"
              title={<span><Icon type="retweet" /><span className="nav-text">传输</span></span>}
            >
              <Menu.Item key="transform-up">
                <span>
                  <Icon type="arrow-up" />
                  <span className="nav-text">上传</span>
                </span>
              </Menu.Item>
              <Menu.Item key="transform-down">
                <span>
                  <Icon type="arrow-down" />
                  <span className="nav-text">下载</span>
                </span>                
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="help">
              <span>
                <Icon type="question-circle-o" />
                <span className="nav-text">帮助</span>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {/* 工具 */}
          <Header className={styles.toolContainer}>
            {(this.state.current.includes('file') ? <FileTool /> : 
                this.state.current.includes('transform') ? 
                  <TransformTool /> : null)}
          </Header>
          {/* 内容 */}        
          <Content className={styles.content}>
            {(this.state.current.includes('file') ? <FileList /> : 
                this.state.current.includes('transform') ? 
                  <TransformList /> : null)}
          </Content>
          {
            // <Footer>
            //   <Row>
            //     <Col span={4}>
            //       <span>文件数量: 100 个</span>
            //     </Col>
            //   </Row>
            // </Footer>
          }
        </Layout>
      </Layout>
    );
  }
}

const Example = () => {
  return (
    <div>
      <SiderDemo />
    </div>
  );
};

Example.propTypes = {
};

export default Example;
