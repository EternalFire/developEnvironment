import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';

import { Layout, Menu, Breadcrumb, Icon, Card, Button, Row, Col, Input, Table, Progress } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import styles from './Example.css'

class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player className={styles.videoContainer}>
        <video ref={ node => this.videoNode = node } className={"video-js " + styles.video}></video>
      </div>
    )
  }
}

function RelatedVideo() {
  return (
    <div>
      RelatedVideo
    </div>
  )
}

class Framework extends React.Component {
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
          style={{
            // 'height': '100vh'
          }}
        >
          <div className="logo">
            善班在线云直播课堂系统
          </div>

          {/* left menu */}      
          <Menu theme="dark" 
            mode={this.state.mode} 
            defaultSelectedKeys={[this.state.current]} 
            onClick={this.handleClick}
            className={styles.siderMenu}
          >
            <Menu.Item key="owner">
              <span>
                <Icon type="info-circle-o" />
                <span className="nav-text"> 我 </span>
              </span>
            </Menu.Item>

            <Menu.Item key="room">
              <span>
                <Icon type="video-camera" />
                <span className="nav-text"> 直播间 </span>
              </span>
            </Menu.Item>

            <SubMenu key="user"
              title={
                <span>
                  <Icon type="user" />
                  <span className="nav-text"> 用户 </span>
                </span>
              }
            >
              {Array.from({length: 10}).map((e, i) => {
                return (
                  <Menu.Item key={i}>
                    <span>user-{i}</span>
                  </Menu.Item>
                )
              })}
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          {/* 工具 
          <Header className={styles.toolContainer}>
            {(this.state.current.includes('file') ? <FileTool /> : 
                this.state.current.includes('transform') ? 
                  <TransformTool /> : null)}
          </Header>
          */}

          {/* 内容 */}        
          <Content className={styles.content}>
            {this.props.children}
          </Content>
          
          
        </Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          trigger={(
            this.state.collapsed ? 
              <div className="ant-layout-sider-trigger">
                <i className="anticon anticon-left"></i>
              </div> : 
              <div className="ant-layout-sider-trigger">
                <i className="anticon anticon-right"></i>
              </div>
          )}
        >
          {/* right menu */}
          <Menu theme="dark" 
            mode={this.state.mode} 
            defaultSelectedKeys={[this.state.current]} 
            onClick={this.handleClick}
          >
            <Menu.Item key="room">
              <span>
                <Icon type="video-camera" />
                <span className="nav-text"> 直播间 </span>
              </span>
            </Menu.Item>
            
            <Menu.Item key="user">
              <span>
                <Icon type="user" />
                <span className="nav-text"> 用户 </span>
              </span>
            </Menu.Item>

          </Menu>
        </Sider>
      </Layout>
    );
  }
}


const Example = () => {  
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    sources: [{
      src: '//vjs.zencdn.net/v/oceans.mp4',
      type: 'video/mp4'
    }]
  }

  return (
    <div>
      <Framework>        
        LIVE!
        <VideoPlayer { ...videoJsOptions } />
        <RelatedVideo />
      </Framework>
    </div>
  );
};

Example.propTypes = {
};

export default Example;
