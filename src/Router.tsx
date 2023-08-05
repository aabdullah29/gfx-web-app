import React, { FC, lazy, Suspense } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { AppLayout } from './layouts'
import {
  NavCollapseProvider,
  PriceFeedProvider,
  NFTAdminProvider,
  OrderBookProvider,
  NFTDetailsProvider,
  NFTAggregatorProvider,
  NFTProfileProvider,
  NFTCollectionProvider,
  PriceFeedFarmProvider,
  AccountsProvider,
  TokenRegistryProvider,
  RewardToggleProvider,
  CryptoProvider,
  OrderProvider
} from './context'
import { GenericNotFound } from './pages/InvalidUrl'
import { TraderProvider } from './context/trader_risk_group'
const Launchpad = lazy(() => import('./pages/NFTs/launchpad/Launchpad'))
const CryptoContent = lazy(() => import('./pages/TradeV3/TradeContainer'))
const Creator = lazy(() => import('./pages/NFTs/CreatorPage/Creator'))
const AdminWrapper = lazy(() => import('./pages/NFTs/adminPage/components/AdminWrapper'))
const AnalyticsWrapper = lazy(() => import('./pages/Analytics/AnalyticsWrapper'))
const Farm = lazy(() => import('./pages/Farm/Farm'))
const Swap = lazy(() => import('./pages/Swap/Swap'))
const ComingSoon = lazy(() => import('./pages/ComingSoon'))
const NFTAgg = lazy(() => import('./pages/NFTs/NFTAgg'))
const TradeAnalyticsWrapper = lazy(() => import('./pages/Analytics/trade/TradeAnalyticsWrapper'))
const LeaderBoard = lazy(() => import('./pages/Stats/LeaderBoard'))
// import NFTLandingPageV2 from './pages/NFTs/Home/NFTLandingPageV2'
// import { NFTs } from './pages/NFTs/NFTs'

import { StatsProvider } from './context/stats'

export const Router: FC = () => (
  <BrowserRouter>
    {window.location.pathname === '/' && <Redirect from="/" to="/swap" />}
    <TokenRegistryProvider>
      <AccountsProvider>
        <CryptoProvider>
          <RewardToggleProvider>
            <NFTDetailsProvider>
              <NFTAggregatorProvider>
                <NavCollapseProvider>
                  <AppLayout>
                    <Suspense fallback={<div>Loading...</div>}>
                      <Switch>
                        <Route exact path="/swap/:tradePair?">
                          <Swap />
                        </Route>
                        <Route path="/trade">
                          <PriceFeedProvider>
                            <OrderProvider>
                              <TraderProvider>
                                <OrderBookProvider>
                                  <CryptoContent />
                                </OrderBookProvider>
                              </TraderProvider>
                            </OrderProvider>
                          </PriceFeedProvider>
                        </Route>
                        <Route path="/NFTs/launchpad">
                          <Launchpad />
                        </Route>
                        <Route path="/NFTs/Creator">
                          <Creator />
                        </Route>
                        <Route path="/NFTs/admin">
                          <NFTAdminProvider>
                            <AdminWrapper />
                          </NFTAdminProvider>
                        </Route>
                        {/* <Route path="/nfts-v1">
                        <NFTProfileProvider>
                          <NFTs />
                        </NFTProfileProvider>
                      </Route> */}
                        <Route path="/nfts">
                          <NFTProfileProvider>
                            <NFTCollectionProvider>
                              <PriceFeedFarmProvider>
                                <NFTAgg />
                              </PriceFeedFarmProvider>
                            </NFTCollectionProvider>
                          </NFTProfileProvider>
                        </Route>
                        <Route exact path="/farm">
                          <ComingSoon />
                        </Route>
                        <Route exact path="/withdraw">
                          <Farm />
                        </Route>
                        <Route exact path="/analytics">
                          <AnalyticsWrapper />
                        </Route>
                        <Route exact path="/analytics/trade">
                          <TradeAnalyticsWrapper />
                        </Route>
                        <Route exact path="/leaderboard">
                          <StatsProvider>
                            <LeaderBoard />
                          </StatsProvider>
                        </Route>
                        <Route>
                          <GenericNotFound />
                        </Route>
                      </Switch>
                    </Suspense>
                  </AppLayout>
                </NavCollapseProvider>
              </NFTAggregatorProvider>
            </NFTDetailsProvider>
          </RewardToggleProvider>
        </CryptoProvider>
      </AccountsProvider>
    </TokenRegistryProvider>
  </BrowserRouter>
)
