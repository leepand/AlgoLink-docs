# 模型管理

本教程将介绍Arthur.io-模型中心化管理的使用方法，程序端调用，后续考虑补充web UI操作。

功能包括：

![ML art #1](/how-to/bolt4dspipe.jpg)

**介绍顺序如下：**

- Tutorial 0: 模型文件中心化管理
- Tutorial 1: 模型训练元数据管理


## Tutorial 0: 模型文件中心化管理

我们将该功能封装成一个python库，它可以让模型文件的序列化变得更容易。它就像数据的git一样！但更好的是，你可以将它包含在你的数据科学/算法代码中。

### 为什么需要集中化管理？
共享数据文件是很常见的，比如数据厂商和消费者之间、数据工程师和数据科学家之间、团队之间等。

但往往这个过程比你想象的要繁琐。有了该模块，只需几行代码，你就可以在一个简单而统一的框架下，将数据文件推送和拉到/从中央文件存储中。收件方不必知道数据存储在哪里，如何存储，发送方代表收件人进行管理。

### 模型管理模块能为你做什么？

- 快速创建公共和私有的中心化文件存储
- 将模型/数据存入/拉取中心文件存储，以同步文件并与他人共享
- 集中管理多个项目的数据/模型文件，可以注册版本信息
- 轻松加载和处理您所拉取的文件

### 它是如何工作的？

该模块的工作原理类似于git：文件存储在中央文件存储中，你把文件拉到自己的建模空间。该模块提供repo API，该API是一个元数据库，存储了拉取和加载数据的设置。与git不同的是，本地文件存储在一个中央文件存储中，易于访问，但与你的代码分开。当模型文件发生变化时，你会将发生变化的文件从/推到中央存储中。

为什么不直接用git也做模型管理呢？
- 原因1: git是为小文本文件设计的，不是为大数据文件设计的，速度慢
- 原因2: 数据信息出了服务器，安全性低。把模型和代码分开也是好的做法，所以你用git管理代码，用我们的模块管理数据和模型。
- 原因3: 模型从算法开发、训练、部署到评估是闭环流程，在本地化server上搭建中心管理有利于流程的pipeline操作

功能列表：

| 模块名称    | 适用阶段  | 功能列表  |
|------------|------------------| ------------------|
| ModelFile     | 模型具体操作   <img width=100/>       | import_file、import_dir、scan_local、pull_file、pull_dir、delete_files_local、config      |
| APILocal       | 查看版本级           | list_local_pipes                             |
| list_profiles      | 查看模型级        | list_profiles                       |



### 使用实例


下面是一个从中央拉取和存储机器学习数据的例子。只需几条命令就可以直接从你的python代码中完成：

#### 1.0 模型及版本信息注册

```python
from bolt4ds.pipe import ModelFile,list_profiles,APILocal

test = ModelFile(model_name = "model_name",version = "model_version",center_path=None)
pipe=test.filepipe()
```
参数说明：

- model_name- 你要上传的模型名称
- version- 你要上传的模型版本
- center_path- 中央存储路径，默认为系统自动指定目录

#### 1.1 上传模型文件或目录

```python
pipe.import_file("model.db",subdir=None,move=False)
pipe.import_dir("local_model_workspace",subdir=None,move=False)
```
参数说明：
- subdir- 向中央存储中心创建子目录（如果不存在的话），并将文件或目录上传至该目录下
- move- True表示将本地模型文件或目录move过去，否则为复制

#### 1.2 查看中央存储中心的相关信息

```python
pipe.scan_local(include="*.py",sortby='mod',attributes=True)
pipe.dir
pipe.filerepo
```
参数说明：
- scan_local
    - include表示查询中央模型目录下已经上传的信息并按照include指定的模式搜索
    - sortby共有三个选项（name、mod、size），分别表示按名称、修改时间或文件大小排序
    - attributes- True时返回文件及属性信息
- pipe.dir 
    - 返回模型+版本目录
- pipe.filerepo
    - 返回模型目录
  
返回示例（属性信息）
```log
([{'filename': 'cookbook-master.zip',
   'modified_at': datetime.datetime(2020, 8, 28, 18, 5, 20, 580856),
   'size': 2814858,
   'crc': '126aa14f9cc66c1d68b2a4c6daf9754e'},
  {'filename': 'setup.py',
   'modified_at': datetime.datetime(2020, 8, 28, 18, 5, 20, 608058),
   'size': 121,
   'crc': '024b7cf68b022a9ce3a0e21534ec003b'}],
 ['cookbook-master.zip', 'setup.py'])

```

#### 1.3 从中央存储中心拉取数据及删除
```python
pipe.pull_file("center_file","model_workspace_path")
pipe.pull_dir("model_workspace_path")
pipe.delete_files_local(files=['model_files'], confirm=False, delete_all=None, ignore_errors=False)
pipe.config
```
参数说明：
- pull_file/pull_dir 从中央存储中心向本地建模空间拉取文件/目录
- delete_files_local 删除中央存储中心执行的文件/list
- config 注册信息 包含-filerepo/server/filereporoot/filled/key等信息

#### 2.0 查看版本对应模型下的版本信息
```python
APILocal(profile="model_name",filecfg="/your/path/cfg.json").list_local_pipes()
```
参数说明：
- 查看模型**model_name**下的发布/上传的所有版本
- filecfg 配置文件所在目录，客户端可以不用配置，由服务端统一配置

#### 3.0 查看当前中央存储中心所有模型
```python
list_profiles()
```
参数说明：
- 返回当前中央目录已经部署的所有模型
- 信息纬度：model_name——filerepo/server/filereporoot/filedb/key

### UI 操作

待开发。。。。。。

## Tutorial 1: 模型训练元数据管理

模型训练元数据管理是一款基于 Python3 的轻量级机器学习(Machine Learning)、深度学习(Deep Learning)模型训练评估指标可视化模块，与算法工程师自研的算法或开源包结合使用，可以记录模型训练过程当中的超参数、Loss、Accuracy、Precision、F1值等，并实时上报至中央元数据库，可供前端查看。

通过调节超参数的方式多次训练模型，并使用模型训练元数据管理模块进行记录，可以很直观的进行模型对比，堪称调参神器。

模型训练元数据管理特性
- 轻量级、无需任何配置、极简API、开箱即用。
- 只需要把模型的超参数和评估指标数据通过API添加即可，轻松三步即可实现。
- 高亮显示修改过的超参数，方便进行模型分析。
- 自动检测和获取正在训练的模型数据，并进行可视化，无需人工参与。
- 使用 SQLite 轻量级本地数据库存储，可供多个用户同时使用，保证每个用户看到的数据是独立。
- 可视化组件采用 Echarts 框架，交互式曲线图设计，可清晰看到每个 epoch 周期的指标数据和变化趋势。

未完待续。。。。。。