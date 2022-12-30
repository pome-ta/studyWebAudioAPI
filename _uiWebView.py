from pathlib import Path
import ui

class View(ui.View):
  def __init__(self, url, *args, **kwargs):
    ui.View.__init__(self, *args, **kwargs)
    self.wv = ui.WebView()
    self.wv.load_url(str(url.absolute()))
    self.wv.flex = 'WH'
    self.add_subview(self.wv)
    

if __name__ == '__main__':
  uri_path = Path('./public/index.html')
  view = View(uri_path)
  view.present(style='fullscreen', orientations=['portrait'])

