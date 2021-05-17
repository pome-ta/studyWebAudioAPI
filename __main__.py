import pathlib

import ui
import pystaScript.wkwebview as wkwebview

uri = pathlib.Path('./public/index.html')


class View(ui.View):
  def __init__(self, *args, **kwargs):
    ui.View.__init__(self, *args, **kwargs)
    self.wv = wkwebview.WKWebView()
    self.wv.load_url(str(uri), True)
    self.wv.flex = 'WH'
    self.add_subview(self.wv)

  def will_close(self):
    self.wv.clear_cache()


if __name__ == '__main__':
  view = View()
  view.present(style='fullscreen', orientations=['portrait'])

