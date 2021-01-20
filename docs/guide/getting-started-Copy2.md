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

### 使用实例

下面是一个从中央拉取和存储机器学习数据的例子。只需几条命令就可以直接从你的python代码中完成：


## Tutorial 1: 模型训练元数据管理

AlgoLink中的工作均发生在项目中。项目包含数据、代码和环境设置，整个项目被自动跟踪和修订。每次通过用户的操作或项目中代码的执行改变文件时，都会向项目写入新的提交。AlgoLink中的用户可以创建自己的新项目，邀请其他用户进行协作，并导出数据或结果供其他项目使用，同时可以在项目中创建在线实验，供模型实时评估使用。

要创建一个项目：

打开AlgoLink，并左上方的 "创建 "按钮。首先创建新项目：

![新建项目](/how-to/algolink/create_proj1.jpg)

- 给你的项目起一个有意义的名字（比如`时序预测`）
- 选择应用领域、设置版本、简单描述
- 点击创建，生成新的项目

## Tutorial 2: 启动建模空间

建模空间会话是由AlgoLink执行器托管的交互式会话，您可以在其中与Jupyter代码Notebook进行交互。你可以使用的软件工具和相关配置称为建模空间，该空间是按用户相互隔离的，即每个用户有自己的环境和kernel，安装包和运行时不会影响其他用户，当工作区的用户界面准备好时，您的浏览器会自动重定向到它。

![新建空间](/how-to/algolink/workspace3.jpg)

一旦你的工作区启动并运行，你会看到一个全新的Jupyter界面。如果你是Jupyter的新手，你可能会发现Jupyter和Jupyterlab文档很有帮助。

## Step 3: 获取您的文件和数据

基本上有两种策略来处理AlgoLink中的数据。

- 你可以把你的数据复制到AlgoLink中

    - 如果你正在处理本地机器上或共享服务器上的数据，你可能想把你的数据上传到AlgoLink中。

- 你可以从AlgoLink的数据库中查询你的数据

    - 如果你有一个大型的数据集存储在数据库或数据服务中，你可能只需要查询数据库或数据服务的API。

在本教程中，我们将使用Jupyter中的终端将数据复制到项目中。

1. 在Notebook输入命令：

```bash
curl -o data.csv "https://www.bmreports.com/bmrs/?q=ajax/filter_csv_download/FUELHH/csv/FromDate%3D2019-09-15%26ToDate%3D2019-10-02/&filename=GenerationbyFuelType_20191002_1657"
```
2. 如果网络没有问题，会在建模空间生成数据文件`data.csv`。

![获取数据](/how-to/algolink/curl-data.jpg)

## Step 4: 开发您的模型

### 介绍

当你在开发模型时，你希望能够快速执行代码，查看输出，并进行迭代改进。AlgoLink通过工作空间实现了这一点。第2步介绍了如何启动一个工作空间。

在本节中，我们将使用Jupyter来加载、探索和转换一些数据。在准备好数据后，我们将训练一个模型。

### Step 4.1: 加载与探索数据

1. 如果你还没有数据，请完成步骤3下载数据集。
2. 在第一个单元格中，输入这些行来导入一些包，然后按Shift+Enter键执行:
```python
%matplotlib inline
import pandas as pd
import datetime
```
3. 接下来，将你下载的文件读到pandas数据框中，然后显示数据:
```python
df = pd.read_csv('data.csv', skiprows=1, skipfooter=1, header=None, engine='python')
```
4. 根据各栏标题的信息，重新命名各栏：https://www.bmreports.com/bmrs/?q=generation/fueltype/current 
```python
df.columns = ['HDF', 'date', 'half_hour_increment',
              'CCGT', 'OIL', 'COAL', 'NUCLEAR',
              'WIND', 'PS', 'NPSHYD', 'OCGT',
              'OTHER', 'INTFR', 'INTIRL', 'INTNED',
               'INTEW', 'BIOMASS', 'INTEM']
df.head()
```
![pandas处理数据](/how-to/algolink/dev-model1.jpg)

我们可以看到，这是一个时间序列数据集。每一行都是一天中连续半小时的增量，详细说明了燃料类型产生的能量。时间由`date`和`half_hour_increment`列指定。

5. 创建一个新列`datetime`，代表测量增量的起始日期时间。例如，`20190930`日期和`2`个半小时的增量意味着指定的时间段是2019年9月19日上午12:30至12:59。

```python
df['datetime'] = pd.to_datetime(df['date'], format="%Y%m%d")
df['datetime'] = df.apply(lambda x:
                          x['datetime']+ datetime.timedelta(
                             minutes=30*(int(x['half_hour_increment'])-1))
                           , axis = 1)
```

6. 通过绘制数据，直观地了解每种燃料类型在一天中的使用情况:

```python
df.drop(
        ['HDF', 'date', 'half_hour_increment'], axis = 1
        ).set_index('datetime').plot(figsize=(15,8))
```
![绘图](/how-to/algolink/dev-model2.jpg)

代表 "联合循环燃气轮机 "的CCGT一栏似乎最有意思。它产生的能量很大，而且非常不稳定。

我们将集中研究这一列，并试图预测这种燃料的发电量。

### Step 4.2: 训练一个模型

数据科学家可以使用许多有助于模型开发的库和包。对于Python来说，最常见的一些是XGBoost、Keras和scikit-learn。这些软件包已经安装在 AlgoLink（默认环境）中。然而，有些时候，你可能会想用一个新的、没有安装在环境中的包进行实验。

我们将使用Facebook Prophet包建立一个模型，它没有安装到默认环境中。你会看到，你可以快速上手新的包和算法，就像它们发布到开源社区一样快。

1. 在接下来的Jupyter单元中，安装Facebook Prophet，同样需要PyStan和版本稍旧的Plotly来兼容Prophet。(注意，PyStan需要4GB的内存来安装，请确保你的工作空间设置为使用足够大的硬件层)：

```python
!pip install -q --disable-pip-version-check "pystan==2.17.1.0" "plotly<4.0.0"
!pip install -qqq --disable-pip-version-check fbprophet==0.6
```

2. 对于Facebook Prophet来说，时间序列数据需要放在DataFrame中，有2列名为`ds`和`y`的数据:

```python
df_for_prophet = df[['datetime', 'CCGT']].rename(columns = {'datetime':'ds', 'CCGT':'y'})
```

3. 将数据分割为训练集和测试集:

```python
X = df_for_prophet.copy()
y = df_for_prophet['y']
proportion_in_training = 0.8
split_index = int(proportion_in_training*len(y))
X_train, y_train = X.iloc[:split_index], y.iloc[:split_index]
X_test, y_test = X.iloc[split_index:], y.iloc[split_index:]
```

4. 导入Facebook Prophet并拟合模型:

```python
from fbprophet import Prophet
m = Prophet()
m.fit(X_train)
```

5. 做一个DataFrame来进行预测，预测CCGT发电量的未来值:

```python
future = m.make_future_dataframe(periods=int(len(y_test)/2), freq='H')
forecast = m.predict(future)
# forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail() #uncomment to inspect the DataFrame
```

6. 用训练和测试数据绘制拟合线:

```python
import matplotlib.pyplot as plt
plt.gcf()
fig = m.plot(forecast)
plt.plot(X_test['ds'].dt.to_pydatetime(), X_test['y'], 'r', linewidth = 1, linestyle = '--', label = 'real')
plt.legend()
```
![拟合曲线](/how-to/algolink/dev-model3.jpg)

### Step 4.3: 输出模型

训练过的模型是用来使用的。每次使用模型时，没有理由重新训练模型。将模型导出或序列化到一个文件，以便以后加载和重用模型。在Python中，pickle模块实现了对对象进行序列化和去序列化的协议。
1. 将训练好的模型导出为pickle文件，供以后使用:

```python
import pickle
# m.stan_backend.logger = None    #uncomment if using Python 3.6 and fbprophet==0.6
with open("model.pkl", "wb") as f:
      pickle.dump(m, f)
```

当我们从模型中创建API时，我们将在步骤5 <5-deploy.html>中使用序列化模型。

## Step 5: 部署您的模型

### 介绍

一旦您开发了您的模型，并认为它足够好和有用，您就会想要部署它。AlgoLink提供了简便的模型注册和部署方案。

### 依赖打包

下面章节的一个先决条件是安装一些包。我们将通过在项目中创建一个`requirements.txt`文件来方便地完成这个工作，它将在每个作业或工作空间会话之前安装文件中列出的Python包。

1. 新建目录`model`，并将第4部中输出的模型存入
2. 在`model`目录下新建文件`requirements.txt`，复制并粘贴以下内容，并保存:

```bash
papermill<2.0.0
pystan==2.17.1.0
plotly<4.0.0
dash
fbprophet==0.6
requests
```
### 创建模型服务文件

如果你想让你的模型为另一个应用程序服务，你将希望以API端点的形式为它服务。AlgoLink Model APIs是可扩展的REST APIs，它可以从Python脚本中的任何函数创建一个端点。当你需要一个API来近乎实时地查询你的模型时，通常使用AlgoLink模型API。

例如，我们创建了一个模型来预测英国联合循环燃气轮机的发电量。

在本节中，我们将部署一个API，使用我们在步骤4中训练的模型来预测未来给定日期的发电量。为此，我们已经创建了一个新的计算环境来安装必要的包，创建一个新的文件，其中包含我们想要作为API暴露的函数，最后注册和部署API。

1. 创建一个新的文件，其中包含了我们要作为API公开的函数。
2. 命名该文件为`cloud_model.py`
3. 输入以下内容并测试是否可以运行:
```python
import pickle
import datetime
import pandas as pd

with open('model.pkl', 'rb') as f:
    m = pickle.load(f)

def predict(year, month, day):
    '''
    Input:
    year - integer
    month - integer
    day - integer

    Output:
    predicted generation in MW
    '''
    ds = pd.DataFrame({'ds': [datetime.datetime(year,month,day)]})
    return m.predict(ds)['yhat'].values[0]
```
![预测文件](/how-to/algolink/deploy-model1.jpg)

4. 接下来这里是修改后的代码，同样的模型被包装在服务器中，这样AlgoLink就可以访问它:

```python
import pickle
import datetime
import pandas as pd
+ import modelcloud
+ from modelcloud.data_types import number



+ X={
+     'year': number(description="year"),
+     'month': number(description="month"),
+     'day': number(description="day"),
+ }

+ Y ={
+     'yhat': number(description="yhat"),
+ }

+ @modelcloud.setup
+ def setup():
+     with open('model.pkl', 'rb') as f:
+         m = pickle.load(f)
+     return m

+ @modelcloud.command('predict', inputs=X, outputs=Y)
def predict(model, input):
    year = input['year']
    month = input['month']
    day = input['day']
    ds = pd.DataFrame({'ds': [datetime.datetime(year,month,day)]})
    y=model.predict(ds)['yhat'].values[0]
    return { 'yhat': y }

+ if __name__ == '__main__':
+     modelcloud.run(runenv="dev")
```

当看到以下提示时说明本地服务测试成功：
![预测文件](/how-to/algolink/deploy-model2.jpg)

5. 本地保存模型服务文件`cloud_model.py`:

上一步骤中本地测试成功后，在本地创建模型保存目录，将模型和程序均保存在该目录下，并将`modelcloud.run(runenv="dev")`改成`modelcloud.run(port=${port},runenv="prod")`

6. 进入项目后，进到`模型服务`tab页面，创建新的分组来区分你的应用

![预测文件](/how-to/algolink/deploy-model3.jpg)

7. 模型注册

将上一节保存后的模型注册至AlgoLink：
![预测文件](/how-to/algolink/deploy-model4.jpg)
注册成功后会生成记录如下：
![预测文件](/how-to/algolink/deploy-model5.jpg)

一旦你确认你的模型在本地正确工作，你可以在使用AlgoLink远程构建模型之前给该服务一个名称、port（若注册时不指定系统会自动分配闲置端口）、并告知`cloud_model.py`所在的位置，AlgoLink会自己去识别相关信息并打包需要的文件和包至模型中心。文件结构：

```file
├── code
│   ├── cloud_model.py        # (Required)预测服务的主文件
│   ├── requirements.txt      # (Optional)依赖信息
│   ├── features              # (Optional)特征信息
│   └── models                # (Optional)模型所在目录，也可以在一级目录。
python: 3.7
cuda: 9.2
entrypoint: python cloud_model.py
build_steps:
  - pip install -r requirements.txt
```

8. 模型上线部署

点击`上线`，等待一分钟左右（准备环境和发布）：
![预测文件](/how-to/algolink/deploy-model6.jpg)
上线成功后，状态改变：

![预测文件](/how-to/algolink/deploy-model7.jpg)

在服务详情页可以查看相关元信息：

![预测文件](/how-to/algolink/deploy-model8.jpg)

同时在地址`http://0.0.0.0:9000/redoc`可以进行服务接口的测试：

![预测文件](/how-to/algolink/deploy-model9.jpg)

## Step 7: 实时更新模型

### 概况

当部署的机器学习模型已经服务于业务时，如何在飞转的引擎下对其进行实时更新，且做到不停机？这是在机器学习应用领域绕不过去的问题，我们知道生产应用中的模型经常会更新，对于营销类的模型变化更快，更新频率经常是小时级或更频繁，那么模型的热部署和版本的自动切换会显得非常关键。

容易想到的方案：只要从POST请求中加载一个新的模型，对不？这看起来是一个简单、合适的方法，但实施关键在理解框架运作原理。

本文将介绍如何让基于AlgoLink应用程序在线更新模型到生产中的步骤。首先，我们将考虑这种方法用于一个单线程的AlgoLink应用程序。接下来，我们将在Web服务器网关接口(WSGI)后面部署它，并发现仍有不足之处。然后，我们将为模型更新添加一个进程锁，以确保在我们的应用程序更新时，其他进程继续提供响应。

![ML Models #1](/how-to/algolink/flask-apps.png)

当然我们需要的不仅仅是一个Flask应用：

Flask是最流行的REST API框架之一，可以用于托管机器学习（ML）模型。这一选择在很大程度上受到数据科学团队在Python方面的专业知识和用Python构建的训练模型的可重用性的影响。数据科学团队广泛使用 Flask 来服务于各种 ML 模型的预测。然而，在Flask应用为生产准备之前，需要考虑一些问题。
我们知道Flask的机制是同步的，如果Flask代码没有被修改为异步运行，那么每次每个进程只能处理一个请求。当你从应用开发扩展到每秒数百--或数千--请求的生产负载(rps)时，这可能会变成一个问题。将Flask应用产品化的第一步是将其置于WSGI后面，WSGI可以生成和管理线程/进程。当然其他框架也是可用的，如Gunicorn和Gevent。

尽管我们使用一些异步框架对Flask进行改进，并没有改变Flask的内部处理机制，假设我们已经训练了一个新的模型，并想要更新到服务中去，可行的方式是通过POST端点将新模型加载到内存中，但请记住，Flask请求是阻塞的，这意味着将新模型加载到内存的POST请求（可能需要几秒/分钟）将阻止其他GET/POST请求的执行。然而这并不是问题的全部，因为python进程之间的状态不是共享的，所以我们现在有一个进程拥有了新更新的模型，而其余的进程仍然使用的是旧模型进行的服务。新的问题是，我们如何才能有效的更新所以进程？我们能否在更新所有进程的同时，仍然保留p-1（假设该服务上线时共起了p个进程）个进程的最低吞吐量？

总结起来，在线服务的模型更新时会碰到的问题如下：
- **异步请求**: 首先需要将你的模型发布为异步服务
- **异步更新**: 需要判别当前进程是否为新模型，并在不影响其他进程的情况下依次更新各进程间的模型
- **实时检测模型状态**: 服务需要知道当前模型的版本和状态，以决定是否触发自动更新机制

我们的解决方案：

| 模块名称    | 适用阶段 | 描述  |
|------------|-----------------| ------------------|
| check_cache     | 请求后          | 每次请求后自动检查模型状态       |
| busy_signal       | 更新时            | 更新模型时对当前进程进行加锁，当有进程在进行模型更新时其他进程不进程更新                             |
| setup_model      | 更新时       | 该模块封装模型更新的实体，与模型请求模块分离                       |
| command      | 模型请求时     | 处理具体的模型请求                        |

模型实时更新原理图：

![ML update model #1](/how-to/algolink/uodate-model.jpg)

在该空间下可以做以下事情：
- 数据探索
- 离线模型开发与测试
- 服务封装
- 线下服务测试
- 服务更新（UI）或模型更新（API POST）

