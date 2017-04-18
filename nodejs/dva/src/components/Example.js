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

function RelatedVideo({ data, title }) {
  return (
    <div className={styles.videoCardContainer}>
      <h3>{title}</h3>
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
      <Card title={'当前视频: ' + title}
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
    current: 'current'
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

    this.props.onClickMenu(e.key);
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
            在线云课堂系统
          </div>

          {/* left menu */}      
          <Menu 
            theme="dark"
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

            <SubMenu key="video"
              title={
                <span>
                  <Icon type="video-camera" />
                  <span className="nav-text"> 视频 </span>
                </span>
              }
            >
              <Menu.Item key="current">
                <span>
                  <Icon type="play-circle" />
                  <span className="nav-text"> 当前 </span>
                </span>
              </Menu.Item>

              <Menu.Item key="discover">
                <span>
                  <Icon type="search" />
                  <span className="nav-text"> 发现 </span>
                </span>
              </Menu.Item>
            </SubMenu>

            {
              // <SubMenu key="user"
              //   title={
              //     <span>
              //       <Icon type="user" />
              //       <span className="nav-text"> 用户 </span>
              //     </span>
              //   }
              // >
              //   {
              //     this.loadUser()
              //   }
              // </SubMenu>
            }
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
      </Layout>
    );
  }
}

class WrapFramework extends React.Component {
  state = {
    current: 'current'
  };

  renderCurrent() {
    if (this.state.current !== 'current') {
      return null;
    }

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
      title: '其他相关:', 
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
          content: 'content_'
        },
        { 
          title: 'title_title', 
          content: 'content_'
        },
        { 
          title: 'title_title', 
          content: 'content_'
        },
        { 
          title: 'title_title', 
          content: 'content_'
        },
      ]
    }

    const videoInfoProps = {
      title: '商业模式设计',
      content: '产品经理经典课程, 商业模式塑造时突出把握全新市场机会, 商业模式再造时突出产业价值链整合, 商业模式调整时突出企业价值链的整合.'
    }    

    return (
      <div>
        <VideoInfo {...videoInfoProps} />
        <VideoPlayer {...videoJsOptions} />
        <RelatedVideo {...relatedVideoProps} />        
      </div>
    )
  };

  // 发现视频
  renderDiscover() {
    if (this.state.current !== 'discover') {
      return null;
    }

    const relatedVideoProps = {
      title: '', 
      data: [
        { 
          title: '产品经理入门指南', 
          content: '评估适不适合做产品, 找到入门学习方法, 走出产品入门误区, 化解产品新人难题'
        },
        { 
          title: '产品经理成长之路-互联网产品及产品经理', 
          content: '产品经理依据公司产品战略，对某个（线）产品（介质、服务、品牌）担负根本责任的企业管理人员'
        },
        { 
          title: '打造互联网产品的台前幕后', 
          content: '产品新人通过学习可体验到一线产品团队在真实商业产品全流程中的技能与思路（原型Axure、流程Visio、文档撰写技巧、团队管理、产品宣讲，突发状况应对、技术选型、产品经理疑难应对等多方位）'
        },
        { 
          title: '关于微信小程序，你应该知道的事', 
          content: '共同打造了从小程序的宏观影响、具体规则，到开发全流程的坑与思考的微信小程序课程'
        },
        { 
          title: '全栈产品经理七天入门', 
          content: '介绍产品经理相关常识，以及产品经理的日常，帮助同学们更快熟悉产品经理平时是怎样工作的'
        },
        { 
          title: '产品经理那些事儿', 
          content: '人们说产品经理是全能型人才，要"搞得过开发、跑得了市场、懂得了运营、做得了设计、写得了文档、讲得了PPT、管得了项目、说得赢老板、看得透本质，最重要的，还要有十年磨一剑的钢铁般的意志"'
        },
        { 
          title: '手把手教你做产品经理', 
          content: '针对完全0基础的人,想要做产品经理.'
        },
        { 
          title: '产品经理实战训练课', 
          content: '本课程通过一个停车场O2O实践项目，详细介绍了产品经理日常工作中所必须掌握的需求分析、市场分析、竞品分析，MRD，PRD等各项技能方法，以练带学'
        }, 
        { 
          title: '实施方法论', 
          content: ''
        },
        { 
          title: '职业心态', 
          content: '全方位装备职业化素养'
        },
        { 
          title: '企业经营沙盘模拟', 
          content: ''
        },
        { 
          title: '大数据', 
          content: '讲解大数据处理分析'
        }, 
        { 
          title: '财务信息化', 
          content: '财务共享中心, 资金管理, 预算管理, 费用报销, 资产管理'
        }, 
        { 
          title: '电商ERP', 
          content: '电商分销管理, 电商财务管理'
        },
        { 
          title: '智能制造', 
          content: '生产设备, 生产成本, 仓储物流的智能监控'
        },
        { 
          title: '供应链信息化', 
          content: '电子采购, 电子销售, 全渠道营销'
        },
        { 
          title: 'ERP课程简介', 
          content: 'ERP(Enterprise Resource Planning) 是企业资源计划的简称'
        },         
      ]
    }

    return (
      <div>
        <RelatedVideo {...relatedVideoProps} />        
      </div>
    )
  };

  render() {

    const frameWorkProps = {
      onClickMenu: (key) => {
        this.setState({ current: key });
      }
    }
    
    return (
      <Framework {...frameWorkProps}>
        {this.renderCurrent()}
        {this.renderDiscover()}        
      </Framework>
    );
  }
}

function Example() {
  return (
    <div>
      <WrapFramework />

    </div>
  );  
};

export default Example;
