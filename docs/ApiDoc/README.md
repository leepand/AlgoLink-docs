---
layout: Homepage
description: '我的信息'
avatar: /profile.jpg
face: /kraken.jpg
head: '丙晟-机器学习平台'
info: '机器学习平台与算法'
interests: 'Arthur.io的建设目标是能够快速、可重复和处理机器学习模型中心化管理、场景算法模块化、模型部署和创建线上实验实时评估模型线上效果。'
socials:
- title: github
  link: https://github.com/leepand
- title: linkedin
  link: https://www.linkedin.com
- title: instagram
  link: https://www.instagram.com
- title: email
  link: 'mailto:pandeng.li[at]163.com'
actions:
- text: Docs
  link: /guide/
---
Arthur.io的建设功能包括：模型中心化管理、建模评估指标元数据化、场景算法模块化、模型服务一键部署等 :dizzy:


# pygments-css


[Pygments](http://pygments.org), a Python-based code highlighting tool, comes with a set of builtin styles (not css files) for code highlighting. You have to generate a CSS file using the command line.

You can generate these yourself, but this git repository has already generated them for you.


build
-----

These css files were generated using pygmentize on the command line like so::

    pygmentize -S default -f html -a .highlight > default.css

You can remove or change the top-level class by removing or modifying `-a .highlight` in the `makefile`.

To regenerate them all with whichever ``pygments`` version you are using, run

    git clone <this repo>
    cd pygments-css
    make cssfiles
