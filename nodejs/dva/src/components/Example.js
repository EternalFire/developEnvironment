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

function RelatedVideo({ data }) {
  return (
    <div className={styles.videoCardContainer}>
      <h3>其他相关:</h3>
      {
        data.map((e, i) => {
          return (
            <Card title={e.title} 
              bordered={false} 
              style={{ width: 250 }}
              className={styles.videoCard}
              key={i}
            >
              <p>
                {e.content}
              </p>
            </Card>
          )
        })
      }      
    </div>
  )
}

function VideoInfo({ title, content }) {
  return (
    <div className={styles.videoInfo}>
      <Card title={'当前直播: ' + title}
        bordered={false} 
      >
        <Row gutter={8}>
          <Col span={12}>
            <p>
              {
                content.length > 80 ? 
                content.substr(0, 80) + '...' : 
                content
              }
            </p>
          </Col>
          <Col span={2} push={10}>
            <Button icon="like" />
          </Col>
          <Col span={2} push={9}>  
            <Button icon="dislike" />
          </Col>
        </Row>
      </Card>
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

  renderComment({name, content, index}) {
    return (
      <p className={styles.commentItem} key={index}>
        <span className={styles.commentName}>{name}</span>
        <span> : </span>
        <span>{content}</span>
      </p>      
    )
  }

  loadUser() {
    return Array.from({length: 10}).map((e, i) => {
      return (
        <Menu.Item key={i}>
          <span>user-{i}</span>
        </Menu.Item>
      )
    })
  }

  loadComment() {
    return Array.from({length: 5}).map((e, i) => {
      return this.renderComment({
        name: 'N1',
        content: 'content content 1231231231123 !!!!!',
        index: i
      });
    })
  }

  render() {
    return (
      <Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          className={styles.sider}
        >
          <div className="logo">
            在线云直播课堂系统
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

            <SubMenu key="room"
              title={
                <span>
                  <Icon type="video-camera" />
                  <span className="nav-text"> 直播间 </span>
                </span>
              }
            >
              <Menu.Item key="room-01">
                <span>room-01</span>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="user"
              title={
                <span>
                  <Icon type="user" />
                  <span className="nav-text"> 用户 </span>
                </span>
              }
            >
              {
                this.loadUser()
              }
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
          className={styles.sider} 
          style={{
            'color': '#eee',
            'position': 'relative'
          }}
        >
          <div className="commentList">
            {
              // this.loadComment()
            }
          </div>

          <div className="commentBox">
            <Input className={styles.commentInput} type="textarea" rows={4} placeholder="输入文字参加互动" />
            <Button className={styles.commentSend}>发送</Button>
          </div>

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
      // src: 'http://121.51.2.101/vhot2.qqvideo.tc.qq.com/g0387zodhl3.p712.1.mp4?sdtfrom=v1010&guid=a1c8cb6b7fcb4cb876d80f69866ce69d&vkey=86DC76359A9805BA503594CAB8D47D04FFFAEDCDD73F42DEDCE1781E6DD1EDE4228885120BB4812BE5ADADBA9775D57F4A8FEE14E5C59B3569CCF792E18D48957CCAE742C779537329FAA74A6BF9A84A719D998C809D0B5BB0CD6A3289EDEDFAF71E0B5332BE84CFBE0BAC92D65C61DB',
      type: 'video/mp4'
    }]
  }

  const relatedVideoProps = {
    data: [
      { 
        title: '产品经理入门指南', 
        content: '帮助你找到打开产品经理大门的正确方式...'
      },
      { 
        title: '互联网产品经理', 
        content: '从实际工作场景中, 了解产品经理的职能, 所需知识...'
      },
      { 
        title: '产品经理那些事儿', 
        content: '聊一聊产品经理的心声'
      },
      { 
        title: 'title_title', 
        content: 'content content content content content content'
      },
      { 
        title: 'title_title', 
        content: 'content content content content content content'
      },
      { 
        title: 'title_title', 
        content: 'content content content content content content'
      },
      { 
        title: 'title_title', 
        content: 'content content content content content content'
      },
    ]
  }

  const videoInfoProps = {
    title: '商业模式设计',
    content: '产品经理经典课程, 商业模式塑造时突出把握全新市场机会, 商业模式再造时突出产业价值链整合, 商业模式调整时突出企业价值链的整合.'
  }

  return (
    <div>
      <Framework>                
        <VideoInfo {...videoInfoProps} />
        <VideoPlayer {...videoJsOptions} />
        <RelatedVideo {...relatedVideoProps} />
      </Framework>
    </div>
  );
};

Example.propTypes = {
};

export default Example;
