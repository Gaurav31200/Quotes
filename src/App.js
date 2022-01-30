import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import QuoteDetails from "./Pages/QuoteDetails";
import Quotes from "./Pages/Quotes";
import NewQuote from "./Pages/NewQuote";
import NotFound from "./Pages/NotFound";
function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" exact>
          <Quotes />
        </Route>
        <Route path="/new-quote">
          <NewQuote />
        </Route>
        <Route path="/quotes/:quoteId">
          <QuoteDetails />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
