# AlgoLink-简介

AlgoLink是一个可扩展的云原生机器学习模型服务器。AlgoLink努力在为数据科学家提供的灵活性和标准化应用之间取得平衡，同时减少数据科学、工程、前端和运维团队之间的摩擦。

杰夫·贝佐斯有句名言：我们应该尽可能想方设法减少组与组之间的沟通交流，而不是增加。这并不意味着组与组之间不应该资源共享不能够合作，而是要找到正确的技术设计和流程的组合来降低沟通成本。AlgoLink设计的初衷就是为了实现模型应用的快速迭代，为数据科学家提供一个简单的方法来部署模型到生产系统，以最小的沟通摩擦加速开发到生产以发挥价值。因为我们相信机器学习/深度学习操作的自动化对扩大人力资源至关重要。AlgoLink非常适合基于自动再训练、版本控制、A/B测试、基于时间或性能的自动模型废弃和基于时间或性能的模型实时路由的工作流，同时AlgoLink为每个建模师提供一个隔离的建模空间，可以在该空间启动交互式Jupyter notebook会话进行数据探索、模型构建、重新训练等事宜，并提供团队管理功能，建模师可以与团队小伙伴共享模型和协作。

传统方式不同模型的实现在不同服务上，每个服务都由不同的同事维护，每次新的实验必须改动线上的服务。这意味着机器学习组的每次迭代都必须经过多次和后端团队的协调并且依赖后端部署代码到线上系统，这使得每次上线的A/B测试都非常痛苦。


`"在理论上，理论和实践没有区别。但在实践中，却有区别。" - "Yogi Berra`

## AlgoLink能做什么？
创建AlgoLink的主要关注点可以总结为：
- 创建建模空间，实现模型构建和发布一体化
- 只需几行代码就可以创建API端点，为训练好的模型提供服务
- 几乎支持所有主要的机器学习训练框架
- 支持自适应微批处理的高性能在线API服务
- 提供模型注册和管理，为团队提供Web UI管理
- 模型环境的轻量级自动设置，像容器一样隔离每个模型应用环境
- 提供模型版本自动更新切换和服务的版本管理
- 提供A/B testing实验管理，可以对发布的API间和其他任意业务目标建立线上实验和效果实时监测
- 后续将持续集成附加功能在建模空间供调用，如ETL、封装算法等

## 为何选择AlgoLink？
目前，机器学习/深度学习模型的**持续部署**和**生命周期管理**被广泛认为是获得ML项目价值的主要瓶颈。数据科学家不是构建生产服务和DevOps最佳实践的专家。数据科学团队生产的训练模型很难测试，也很难部署。这往往导致我们陷入了一个耗时且容易出错的工作流程，一个训练好的模型或权重文件被交给软件工程团队去实施部署。

AlgoLink是一个端到端的模型服务解决方案，使得数据科学团队可以构建生产就绪的模型服务端点，并内置了A/B在线实验管理，方便快速评估线下模型的实践效果。

现实是复杂的，模型永远不会完全模仿真实现象。当你在机器学习这条令人兴奋的道路上冒险时，请记住伟大的统计学家George Box的名言。"[所有的模型都是错误的，但有些模型是有用的](https://en.wikipedia.org/wiki/All_models_are_wrong)"。总的来说一个实验中的算法或模型想在生产中产生价值主要会经理以下痛点：
- 希望减少数据科学、工程、前端和运维团队之间的沟通和摩擦
- 数据科学家需要能灵活地使用他们想要的工具（H2O、TensorFlow、Spark、xgboost等）
- 我们希望将模型部署的生命周期管理方面自动化，如自动性能或基于时间的路由更新和落后模型的下线
- 我们希望有一个模型服务器，可以方便地进行模型的部署发布、版本更新和A/B测试。这使得我们的数据科学家能够在不影响生产的情况下，使用与生产部署时相同的工具对真实生产数据进行实验
- 我们想要的是易于部署和扩展的模块，以适应不同的部署场景（on-prem本地数据中心单例、实例集群、Kubernetes托管、云原生等）
- 我们希望能够将预测请求视为一个流，将模型更新视为一个流。这让我们更新后端模型的时候不影响前端的预测请求，随着时间的变化不断的请求到新模型的内容
- 我们希望避免 "超级英雄"的数据科学家，他们不需要知道模型部署容器化、环境隔离等知识，省下更多时间倾注在应用科学上
- 最重要的是，我们希望产品和框架具有可重复性。我们不想在得到特定框架的支持后就重新发明轮子

解决以上痛点只需登陆Algolink进行一些列简单配置和操作即可完成。

![ML art #1](/how-to/ml-rewrite.jpg)

本教程将引导您了解AlgoLink中常见的模型生命周期。您将从使用英国平衡机制报告服务的数据开始（数据来自网络）。我们将探索按燃料类型划分的发电量，并预测未来的发电量。你将看到在AlgoLink中使用的Jupyter、pandas和Prophet的例子。


## 技术支持

❓如果您在安装或应用过程中遇到任何问题或难题，请访问[支持中心](mailto:pandeng.li@163.com)。还在纠结吗？请点击右下角的聊天图标或在AlgoLink应用程序中直接与我们联系。


Now, let's try it :point_right:

# Introduction

This is a skeleton built for generating static site for yourself, especially helpful and friendly to students, teachers, developers, researchers and so on.

It's suitable for building your personal homepage with:
- About me :raising_hand:
- Projects, publications, portfolio :books:
- Biography, timeline, resume(CV) :page_with_curl: 

## Features
- Markdown and emoji supported :smiley:
- Elegant and minimalistic
- Customizable and mobile-friendly
- Multi-language support
- Powered by [VuePress](https://vuepress.vuejs.org/) and [Vue.js](https://vuejs.org/)

Now, let's try it :point_right: