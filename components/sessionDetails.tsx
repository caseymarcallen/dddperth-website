import * as React from 'react'
import { Fragment } from 'react'
import { Session } from '../config/types'

interface SessionProps {
  session: Session
  showPresenter: boolean
  hideTags: boolean
  hideLevelAndFormat: boolean
  showBio: boolean
}

const SessionDetails: React.StatelessComponent<SessionProps> = ({
  session,
  showBio,
  showPresenter,
  hideTags,
  hideLevelAndFormat,
}) => (
  <Fragment>
    {showPresenter &&
      session.Presenters.map(p => (
        <p key={p.Id}>
          <img
            src={p.ProfilePhotoUrl || '/static/images/profile-image-blank.jpg'}
            alt={p.Name + ' profile photo'}
            className="profile-photo"
          />
          <em>{p.Name}</em>{' '}
          {p.TwitterHandle || p.WebsiteUrl ? (
            <small>
              ({p.TwitterHandle ? (
                <React.Fragment>
                  <a
                    href={
                      'https://twitter.com/' +
                      p.TwitterHandle.replace(/https?\:\/\/(www\.)?twitter.com\//, '').replace(/\?.+$/, '')
                    }
                    target="_blank"
                  >
                    @{p.TwitterHandle.replace(/https?\:\/\/(www\.)?twitter.com\//, '').replace(/\?.+$/, '')}
                  </a>
                  {p.WebsiteUrl ? ' | ' : null}
                </React.Fragment>
              ) : null}
              {p.WebsiteUrl ? (
                <React.Fragment>
                  <a href={p.WebsiteUrl} target="_blank">
                    {p.WebsiteUrl.includes('linkedin.com')
                      ? 'LinkedIn'
                      : p.WebsiteUrl.replace(/https?\:\/\/(www\.)?/, '')}
                  </a>
                </React.Fragment>
              ) : null}
              )
            </small>
          ) : null}
        </p>
      ))}
    <p className="preserve-whitespace" style={{ marginBottom: '10px' }}>
      {session.Abstract}
    </p>
    <p style={{ margin: '10px 0 15px 0' }} className="tags">
      {!hideLevelAndFormat && (
        <Fragment>
          <span className="badge badge-primary">{session.Level}</span>{' '}
          <span className="badge badge-secondary">{session.Format}</span>{' '}
        </Fragment>
      )}
      {!hideTags &&
        (session.Tags || []).map(tag => (
          <React.Fragment key={tag}>
            <span className={'badge ' + (hideLevelAndFormat ? 'badge-secondary' : 'badge-info')}>{tag}</span>{' '}
          </React.Fragment>
        ))}
    </p>
    {showBio &&
      session.Presenters.map(p => (
        <p className="preserve-whitespace">
          {session.Presenters.length > 1 && (
            <Fragment>
              <strong>{p.Name}</strong>
              <br />
            </Fragment>
          )}
          <em>{p.Bio}</em>
        </p>
      ))}
  </Fragment>
)

export default SessionDetails
